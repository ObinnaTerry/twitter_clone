// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;


contract Twitter {

    struct Tweet{
        uint256 id;
        uint256 tweetTime;
        address senderAddress;
        string tweet;
        bool isActive;
    }

    uint256 counter;

    Tweet[] public tweets;

    event NewTweet(uint256 index, uint256 tweetTime);
    event DeleteTweet(uint256 index, bool status);
    event EditTweet(uint256 index, string newTweet);

    constructor() {
        counter = 1;
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
            tweetTime: block.timestamp,
            senderAddress: msg.sender,
            tweet: message,
            isActive: true
        }));
        
        counter++;
    }

    function editTweet(uint index, string calldata newMessage) external {
        require(index <= tweets.length, "Index out of range");

        Tweet storage tweetToEdit = tweets[index];

        require(msg.sender == tweetToEdit.senderAddress, "Cant only edit your own tweets");

        require(tweetToEdit.isActive, "Cant modify deleted tweet");

        tweetToEdit.tweet = newMessage;
    }

    function getTweets() external view returns (Tweet [] memory){
        return tweets;
    }

}

