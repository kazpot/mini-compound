const SimplePriceOracle = artifacts.require("./SimplePriceOracle");

module.exports = async (deployer) => {
  deployer.deploy(SimplePriceOracle);
};
