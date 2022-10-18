// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;


contract Twitter {

    struct Tweet{
        uint id;
        address senderAddress;
        string tweet;
        bool isActive;
    }

    uint counter;

    Tweet[] public tweets;

    constructor() {
    }
    
    function remove(uint index)  external returns (Tweet [] memory) {
        require(index < tweets.length, "Index out of range");

        tweets[index].isActive = false;
        
        return tweets;
    }

    //need to understand better the difference between memory and calldata keywords for input pameter and how it effects 
    //performance and gas cost
    function addTweet(string memory message) external {
        
        tweets.push(Tweet({
            id: counter,
            senderAddress: msg.sender,
            tweet: message,
            isActive: true
        }));
        
        counter++;
    }

    function editTweet(uint index, string calldata newMessage) external {
        require(index <= tweets.length, "Index out of range");

        Tweet storage tweetToEdit = tweets[index];

        require(tweetToEdit.isActive, "Cant modify inactive tweet");

        tweetToEdit.tweet = newMessage;
    }

    function getTweets() external view returns (Tweet [] memory){
        return tweets;
    }

}

