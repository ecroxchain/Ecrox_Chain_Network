# Network

- [Network](#network)
  - [General](#general)
    - [Clone Repository](#clone-repository)
    - [Install Dependencies](#install-dependencies)
    - [Run Unit Tests](#run-unit-tests)
  - [Contracts](#contracts)
    - [Compile](#compile)
    - [ABIs](#abis)
    - [Flatten](#flatten)
    - [Deploy](#deploy)
  - [Run Local Node](#run-local-node)
    - [Pre-Requisites](#pre-requisites)
    - [Hardware](#hardware)
        - [Bootnode, Node or Explorer Node](#bootnode-node-or-explorer-node)
        - [Validator](#validator)
    - [Using Quickstart](#using-quickstart)
      - [OE](#oe)
      - [Nethermind](#nethermind)
    - [Using Docker](#using-docker)
      - [Usage](#usage)
      - [Examples](#examples)
        - [Bootnode](#bootnode)
        - [Node](#node)
        - [Validator](#validator-1)
        - [Create New Account](#create-new-account)
        - [Explorer node](#explorer-node)
  - [Building containers](#building-containers)

## General
### Clone Repository
```
$ git clone https://github.com/ecroxchain/network.git ~/Dev/network
```

### Install Dependencies
```
$ npm install
```

### Run Unit Tests
```
$ npm test
```

## Contracts
### Compile
```
$ npm run compile
```

### ABIs
```
$ npm run abi
```

### Flatten
```
$ npm run flatten
```

### Deploy
Make sure `NETWORK_NAME` is defined in [`truffle-config`](https://github.com/ecroxchain/network/blob/master/truffle-config.js)

Make sure you've created an `.env` using the template [`env.example`](https://github.com/ecroxchain/network/blob/master/.env.example)

Run:

```
$ ./node_modules/.bin/truffle migrate --reset --network <NETWORK_NAME>
```

## Run Local Node

Read more at: [https://github.com/ecroxchain/CoinNetwork/tree/master/node-example](https://github.com/ecroxchain/CoinNetwork/tree/master/node-example)