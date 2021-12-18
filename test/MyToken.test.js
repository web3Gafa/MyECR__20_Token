require("dotenv").config({path:"../.env"})

const Token = artifacts.require("MyToken")

// configuring BN
const chai = require("./setUpChai.js")
const BN = web3.utils.BN
const expect = chai.expect

// the hook which gets called everytime before we write any test
beforeEach(async () =>{
    /// crate a new instance of the token
    this.myToken = await Token.new(process.env.INITIAL_TOKENS)
})

contract("Token Test",async (accounts) =>{

    const [deployerAccount , recipient, anotherAccount] = accounts
    it("All Tokens should be in my account",async () =>{

       
        /// get the instance 
        let instance = await this.myToken;
        let totalSupply = await  instance.totalSupply();

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)

    })

    it("is possible to send tokens to tokens between accounts",async () =>{
        const sendToken = 1;
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(deployerAccount)).to.be.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient,sendToken)).to.be.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        return expect(instance.balanceOf(recipient)).to.be.eventually.be.a.bignumber.equal(new BN(sendToken))
    })

    it("is not possible to send more tokens than available in total",async () =>{
        let instance = await this.myToken
        let balanceOfDeployer = await instance.balanceOf(deployerAccount)

        // sending more than we have in the contract
        expect(instance.transfer(recipient,new BN(balanceOfDeployer +1))).to.eventually.be.rejected
        // the balnace should not go down trasanstion  fails
        return expect(instance.balanceOf(deployerAccount)).to.be.eventually.be.a.bignumber.equal(balanceOfDeployer)
    })

})