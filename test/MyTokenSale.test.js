require("dotenv").config({path:"../.env"})

const TokenSale = artifacts.require("MyTokenSale")
const Token = artifacts.require("MyToken")

const chai = require("./setUpChai.js")
const BN = web3.utils.BN
const expect = chai.expect

// the hook which gets called everytime before we write any test

contract("TokenSale Test",async (accounts) =>{

    const [deployerAccount , recipient, anotherAccount] = accounts

    it('Should have any tokens in my deployer Account', async ()=>{
        let instance = await Token.deployed()
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0))
    })


})