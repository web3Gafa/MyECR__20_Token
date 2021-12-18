require("dotenv").config({path:"./env"})
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider")



// used by the hdprovider

const AccountIndex = 0

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    // ganache_local:{
    //   provider:function(){
    //     return new HDWalletProvider(process.env.MNEMONIC,"http://127.0.0.1:8545",AccountIndex)
    //   },
    //   network_id:5777
    // }
  },
  compilers: {
    solc: {
      version: "0.6.0"
    }
  }
};
