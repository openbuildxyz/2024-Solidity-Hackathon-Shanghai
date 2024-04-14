var Migrations = artifacts.require("./MyTruesure.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
