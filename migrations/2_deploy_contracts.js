require("dotenv").config({path:"../.env"})

var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale")

module.exports = async function(deployer){

    let addr = await web3.eth.getAccounts()

    await deployer.deploy(MyToken,process.env.INITIAL_TOKENS);
    await deployer.deploy(MyTokenSale,1,addr[0],MyToken.address)

    // sending all the tokens to Token Sale Contract
    let instance = await MyToken.deployed();
    await  instance.transfer(MyTokenSale.address,process.env.INITIAL_TOKENS)

}