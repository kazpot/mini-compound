require('dotenv').config();

const Comptroller = artifacts.require("./Comptroller");
const JumpRateModel = artifacts.require("./JumpRateModel");
const CEther = artifacts.require("./CEther");
const CErc20 = artifacts.require("./CErc20");


const ADMIN = process.env.ADMIN_ADDRESS;

module.exports = async (deployer) => {
  deployer.deploy(Comptroller)
    .then(() => deployer.deploy(JumpRateModel, "20000000000000000", "200000000000000000", "2000000000000000000", "900000000000000000"))
    .then(() => deployer.deploy(CEther, Comptroller.address, JumpRateModel.address, "200000000000000000000000000", "Compound Ether", "CEther",  8, ADMIN))
    .then(() => deployer.deploy(CErc20, FAKE_USDC, Comptroller.address, JumpRateModel.address, "200000000000000", "Compound USD Coin", "cUSDC", 8, ADMIN))
    .then(() => Comptroller.deployed())
    .then((instance) => {
      instance._supportMarket(CEther.address);
      instance._supportMarket(CErc20.address);
    });
};
