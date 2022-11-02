import { ethers } from 'ethers';
import CheckEthConnection from './CheckEthereumConnection';

function Connect() {
    CheckEthConnection();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    if(window.ethereum._state.account == undefined) {
        const request = provider.send("eth_requestAccounts", []); 
        
        console.log(request);
    } else {
        console.log("You are already connected", window.ethereum._state.account);
    }
 
}

export default Connect;