const Comptroller = artifacts.require("./Comptroller");
const JumpRateModel = artifacts.require("./JumpRateModel");
const CEther = artifacts.require("./CEther");

module.exports = async (deployer) => {
  deployer.deploy(Comptroller)
    .then(() => deployer.deploy(JumpRateModel, "20000000000000000", "200000000000000000", "2000000000000000000", "900000000000000000"))
    .then(() => deployer.deploy(CEther, Comptroller.address, JumpRateModel.address, "200000000000000000000000000", "Compound Ether", "CEther",  8, "0x2d54e4392ad68d616ce936769abb00f331379c2f"));
};
