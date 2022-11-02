import React, { Component } from 'react';
import { ethers } from 'ethers';

import abi from '../utils/Twitter.json';

const TWEETER_ADDRESS = '0x3D4269B71849Dc22191e35C81397915E4294B029';

class ExecuteTwitter extends Component {
    constructor(props) {
        super(props);
        this.state = { tweets: "" };
    }

    async fetchTweets() {
        if (typeof window.ethereum !== "undefined") {
            //ethereum is usable get reference to the contract
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider.getSigner());

            const contract = new ethers.Contract(TWEETER_ADDRESS, abi.abi, provider.getSigner());
      
            //const data = await contract.addTweet("What the fuck!");
            const data = await contract.getTweets();
            console.log(data);
            
            //try to get the tweets in the contract
            // try {
            //     const data = await contract.getTweets();
            //     console.log(data);
                
            //     // this.setState({tweets: data});
            //     // console.log("Data: ", data);
            // } catch (e) {
            //     console.log("Err: ", e)
            // }
        }
    }

    render() { 
        return (<><button onClick={()=>this.fetchTweets()}>Get Tweets</button></>);
    }
}
 
export default ExecuteTwitter;