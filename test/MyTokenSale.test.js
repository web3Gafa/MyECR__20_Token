require("dotenv").config({path:"../.env"})

const TokenSale = artifacts.require("MyTokenSale")
const Token = artifacts.require("MyToken")
const KycContract = artifacts.require("KycContract")

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
    it("all tokens ahold be in a Token Sale smart contract by default",async () =>{
        let instance = await Token.deployed();
        let balanceOfTokenSaleSmartcontract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
       return expect(balanceOfTokenSaleSmartcontract).to.be.a.bignumber.equal(totalSupply)

    })
    it("should be possible to buy tokens", async () =>{


        let tokenInstance = await  Token.deployed()
        let tokenSaleInstance = await TokenSale.deployed();
        let kycInstance = await KycContract.deployed()
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount,{from:deployerAccount});
        await kycInstance.setKycCompleted(deployerAccount)
        expect(tokenSaleInstance.sendTransaction({to:deployerAccount, value:1})).to.be.fulfilled;
        
        balanceBefore = balanceBefore.add(new BN(1))
        return expect(tokenInstance.balanceOf(deployerAccount)).to.be.eventually.be.a.bignumber.equal(balanceBefore)
    })


})