# Simple Twitter Clone Solidity Project

This project demonstrates a basic Blockchain use case. The project implements a simple twitter clone with basic functionality using solidity and deployed on the Ethereum Goerli testnet. 

This project is developed jusing Hardhat which is an Ethereum development library based on Javascript. To successfully run the project, the host machine must be running a Node.js version `>=16.0`. 

Use https://hardhat.org/tutorial for the official documentation on installing Node.js and Hardhat
<br />
<br />

#### Run Tests
use `npx hardhat test` to execute the test script. The test provides a good coverage of the functions. 
<br />
<br />

#### Deploy Locally
To deploy contract locally, its required to create a local Ethereum network by starting a local node.
To start a local node, run `npx hardhat node`. To keep the local node running, the shell where this command is run must remain open. 
Use new shells for other commands. 

After the local node has been successfully started, execute `npx hardhat run scripts/deploy.js --network localhost` on a new shell.
This should deploy the contract locally. 
<br />
<br />

#### Deploy on Goerli TestNet
In order to deploy to Goerli, we need test ether. You can grab some test ETH for Goerli through a faucet like https://goerlifaucet.com. Make sure that your MetaMask wallet is set to the "Goerli Test Network" before using faucet.

You will need an RPC URL for the app. If you dont have one, create one with providers such as https://www.quicknode.com/ or https://www.alchemy.com/.

Use a `.env` file for the RPC URL and your private key. Use `npm install --save dotenv` to install `.env` if not present. 
##### NEVER EXPOSE YOUR PRIVATE KEY OR YOU WILL LOSE ALL YOUR FUND!!!

The `hardhat.config.js` file has already been configured for Goerli testnet. 
In the `.env` file, provide the key-value pairs for `STAGING_QUICKNODE_KEY` and `PRIVATE_KEY`

run `npx hardhat run scripts/deploy.js --network goerli` to deploy the app to the Goerli testnet. 

Remember to note the deployed contract address for further interactions with the contract. 

<br />
<br />
visit https://hardhat.org/ for more information on Hardhat
