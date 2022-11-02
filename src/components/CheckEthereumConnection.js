

async function CheckEthConnection() {
    try {
        const { ethereum } = window;

        if(!ethereum) {
            console.log("There is not MetaMask connection");
        } else {
            console.log("We have the ethereum object: ", ethereum);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts'});

        if(accounts.length > 0) {
            const account = accounts[0];
            console.log("We have found an account: ", account);
            
        } else {
            console.log("No authorized account found");
        }

    } catch(err) {
        console.log(err);
    }
}

export default CheckEthConnection;