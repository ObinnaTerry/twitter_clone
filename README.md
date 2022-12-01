# Simple Twitter Clone Solidity Project
A solidity based blockchain basic twitter app. The project is developed using the Solidity language and Hardhat which is an Ethereum development library based on Javascript. The project implements a simple twitter clone with basic functionality using solidity and deployed on the Ethereum Goerli testnet.

## Motivation
This project is in fulfilment of the Blockchain course at Epita. The project aims to help students understand the basics of blockchains, its use cases as well as the constraints of developing on the blockchain especially the Ethereum POS chain. 
This project demonstrates a basic Blockchain use case. The project implements a simple twitter clone with basic functionality using solidity and deployed on the Ethereum Goerli testnet. 
<p>Together we can take crypto to the moon :rocket:</p>

## Features
* Create tweet
* Edit tweet
* Delete tweet
* Read tweet
* Like tweet
* Unlike tweet

## Usage
To successfully run the project, the host machine must be running a Node.js version `>=16.0` and Hardhat properly set up. 
Use https://hardhat.org/tutorial for the official documentation on installing Hardhat and Node.js

### Run Tests
The test provides a good coverage of the functions. Use:
```bash
npx hardhat test
```
or 
```bash
npm test
```

### Deploy Locally
To deploy contract locally, its required to create a local Ethereum network by starting a local node.
To start a local node run:
```bash
npx hardhat node
```
This will start a local instance of the Ethereum network. Do not close the shell where the above command is run. closing the shell will stop the local Ethereum instance. Use a different shell to execute other commands.

After the local node has been successfully started, execute ```bash npx hardhat run scripts/deploy.js --network localhost``` on a new shell.
This should deploy the contract locally. 

### Deploy on Goerli TestNet
In order to deploy to Goerli, we need test ethers. You can grab some test ETH for Goerli through a faucet like https://goerlifaucet.com. Make sure that your MetaMask wallet is set to the "Goerli Test Network" before using the faucet.

You will need an RPC URL for the app. If you dont have one, create one with providers such as https://www.quicknode.com/ or https://www.alchemy.com/.

Use a `.env` file for the RPC URL and your private key. Use 
```bash 
npm install --save dotenv
``` 
to install `.env` if not present. 
<b>NEVER EXPOSE YOUR PRIVATE KEY OR YOU WILL LOSE ALL YOUR FUND!!!</b>

The `hardhat.config.js` file has already been configured for Goerli testnet. 
In the `.env` file, provide the key-value pairs for `STAGING_QUICKNODE_KEY` and `PRIVATE_KEY`

To deploy the app to the Goerli testnet. run 
```bash
npx hardhat run scripts/deploy.js --network goerli
``` 

Remember to note the deployed contract address for further interactions with the contract. 

visit https://hardhat.org/ for more information on Hardhat
