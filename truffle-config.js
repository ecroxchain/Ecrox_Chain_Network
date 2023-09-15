require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const fs = require('fs')
const EthWallet = require('ethereumjs-wallet')

const {
  RPC,
  WALLET_PROVIDER_METHOD,
  CREDENTIALS_KEYSTORE,
  CREDENTIALS_PASSWORD,
  MNEMONIC
} = process.env

let walletProvider
if (WALLET_PROVIDER_METHOD === 'keystore') {
  const keystore = fs.readFileSync(CREDENTIALS_KEYSTORE).toString()
  const password = fs.readFileSync(CREDENTIALS_PASSWORD).toString().trim()
  const wallet = EthWallet.fromV3(keystore, password)
  const pkey = wallet.getPrivateKeyString()
  walletProvider = new HDWalletProvider(pkey, RPC)
} else if (WALLET_PROVIDER_METHOD === 'mnemonic') {
  walletProvider = new HDWalletProvider(MNEMONIC, RPC)
}

module.exports = {
  networks: {
    ganache: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 10000000
    },
    test: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      // gas: 10000000,
      gasPrice: 1000000000, // 1 gwei
      verify: {
        apiUrl: 'http://localhost:4000/api',
        apiKey: "123"
      }
    },
    fuse: {
      host: 'localhost',
      port: 8545,
      // provider: walletProvider,
      network_id: 2321,
      // gas: 90.,00000,
      gasPrice: 1000000000, // 1 gwei
      verify: {
        apiUrl: 'https://bspexplorer.com/api',
        apiKey: "123"
      }
    },
    local: {
      provider: walletProvider,
      network_id: 999,
      // gas: 10000000,
      gasPrice: 1000000000 // 1 gwei
    }
  },
  compilers: {
    solc: {
      version: '0.4.26',
      optimizer: {
        enabled: true,
        runs: 200
      },
      // evmVersion:"Default"
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 1
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    fuse: '123'
  }
}
