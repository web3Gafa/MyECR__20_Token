const Token = artifacts.require("MyToken")

// configuring BN
var chai = require("chai");
const BN = web3.utils.BN
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN)

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


const expect = chai.expect

contract("Token Test",async (accounts) =>{
    it("All Tokens should be in my account",async () =>{
        /// get the instance 
        let instance = await Token.deployed();
        let totalSupply = await  instance.totalSupply();

        expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply)

    })

})