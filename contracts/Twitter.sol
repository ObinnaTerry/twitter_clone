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
        require(index <= tweets.length, "Index out of range");

        tweets[index].isActive = false;
        
        return tweets;
    }
}

