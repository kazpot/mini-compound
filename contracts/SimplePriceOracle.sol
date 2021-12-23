pragma solidity ^0.5.16;

import "./PriceOracle.sol";
import "./CErc20.sol";
import "./AggregatorV3Interface.sol";

contract SimplePriceOracle is PriceOracle {
    mapping(address => uint256) prices;

    AggregatorV3Interface internal priceFeed;

    event PricePosted(
        address asset,
        uint256 previousPriceMantissa,
        uint256 requestedPriceMantissa,
        uint256 newPriceMantissa
    );

    constructor() public {
        priceFeed = AggregatorV3Interface(
            0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        );
    }

    function _getLatestPrice() internal view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function _getUnderlyingAddress(CToken cToken)
        private
        view
        returns (address)
    {
        address asset;
        if (compareStrings(cToken.symbol(), "CEther")) {
            asset = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
        } else {
            asset = address(CErc20(address(cToken)).underlying());
        }
        return asset;
    }

    function getUnderlyingPrice(CToken cToken) external view returns (uint256) {
        address asset = _getUnderlyingAddress(cToken);
        int256 price = _getLatestPrice();
        require(price >= 0, "price must be positive");
        return uint256(price);
    }

    function setUnderlyingPrice(CToken cToken, uint256 underlyingPriceMantissa)
        public
    {
        address asset = _getUnderlyingAddress(cToken);

        emit PricePosted(
            asset,
            prices[asset],
            underlyingPriceMantissa,
            underlyingPriceMantissa
        );
        prices[asset] = underlyingPriceMantissa;
    }

    function setDirectPrice(address asset, uint256 price) public {
        emit PricePosted(asset, prices[asset], price, price);
        prices[asset] = price;
    }

    // v1 price oracle interface for use as backing of proxy
    function assetPrices(address asset) external view returns (uint256) {
        return prices[asset];
    }

    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }
}
