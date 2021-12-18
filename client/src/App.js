import React, { Component } from "react";
import MyToken from "./contracts/MYTOKEN.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";


import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded:false , tokenSaleAddress :null,userTokens:0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
     
      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );
      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );


      //listen to token transer be4 we initialise the project
      this.listenToTokenTransfer()

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded :true,tokenSaleAddress :MyTokenSale.networks[this.networkId].address},this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) =>{
    const target = event.target;
    const value = target.type === "checkbox"?target.checked :target.value;
    const name = target.name;
    this.setState({
      [name]:value
    })
  }

  handleKycWhiteListing = async () =>{
    // interaction with the blockchain now
   let results =  await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({ from:this.accounts[0] })
   console.log(results)

  }

  updateUserTokens = async () =>{
    // getting the balace of some
    let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
    this.setState({userTokens:userTokens})

  }
  listenToTokenTransfer = () =>{
    /// update the ui whrn there is a transer event to this account
    this.tokenInstance.events.Transfer({to:this.accounts[0]}).on("data", this.updateUserTokens)
  }

  handleBuyTokens = async() =>{
    await this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({from:this.accounts[0], value:1})
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Happy Again ,Gafa Coins Sale</h1>
        <p>Get Your Tokens today</p>
        <h2>Kyc WhiteListing</h2>
        address To Allow :<input type="text" name="kycAddress" value={ this.state.kycAddress} onChange={this.handleInputChange}/>

        <button type="button" onClick={this.handleKycWhiteListing}> Add To WhiteList</button>

        <p>If you want to buy tokens , send Wei to this address:{this.state.tokenSaleAddress}</p>
        <hr/>

        <p>You currently have : {this.state.userTokens} GAFA COINS</p>
        <button type="button" onClick={ this.handleBuyTokens}>Buy More Tokens</button>
        
      </div>
    );
  }
}

export default App;
