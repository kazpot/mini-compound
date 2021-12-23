const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.WALLET_KEY, `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`)
      },
      network_id: 4,
      gas: 29000000
    }
  },
  compilers: {
    solc: {
      version: "0.5.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  },
}
