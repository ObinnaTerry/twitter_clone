# Simple Twitter Clone Solidity Project

This project demonstrates a basic Blockchain use case. The project implements a simple twitter clone with basic functionality using solidity and deployed on the Ethereum Goerli testnet. 


use `npx hardhat test` to execute the test script. The test provides a good coverage of the functions. 

To deploy contract locally, its required to create a local Ethereum network by starting a local node.
To start a local node, run `npx hardhat node`. To keep the local node running, the shell where this command is run must remain open. 
Use new shells for other commands. 

After the local node has been successfully started, execute `npx hardhat run scripts/deploy.js --network localhost` on a new shell.
This should deploy the contract locally. 

visit https://hardhat.org/ for more information on Hardhat
