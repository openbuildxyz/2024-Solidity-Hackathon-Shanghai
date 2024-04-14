const MyContract = artifacts.require("MyTruesure");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};