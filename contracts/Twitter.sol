// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;


/// @title A twitter clone project for the blockchain class 
/// @author Obinna Donatus
/// @author Bernard Polidario
/// @author Ronnel Martinez
/// @author Sanjana Raparthi
contract Twitter {

    struct Tweet{
        uint256 id;
        uint256 tweetTime;
        address senderAddress;
        string tweet;
        bool isActive;
        uint256 likes;
        //address[] likeAddress;
    }

    uint256 totalTweetsCounter;
    uint256 deletedTweetsCounter;

    mapping(uint256 => Tweet) public tweets;
    mapping(uint256 => address[]) likesMapping;

    event NewTweet(uint256 index);
    event DeleteTweet(uint256 index, bool status);
    event EditTweet(uint256 index, string newTweet);
    event LikeTweet(uint256 index, uint256 likes);

    /// @notice The tweet does not belong to you
    error UnauthorizedAccess();
    /// @notice The tweet is already deleted
    error DeletedTweet();
    /// @notice Provided id does not exist
    error IdError();
    /// @notice Tweet exceeds allowed max length
    error InvalidMessage();
    /// @notice Can not like tweet more than once
    error LikeTweetError();


    constructor() {
        totalTweetsCounter = 0;
        deletedTweetsCounter = 0;
    }
    
    /// @notice Remove a tweet from the map
    /// @dev This function does not delete tweet but only changes the flag. This is done to reduce computation and save gas
    /// @param index The index of the tweet to be deleted
    function remove(uint256 index)  external {

        Tweet storage tweetToDelete = tweets[index];

        if (tweetToDelete.senderAddress == address(0)){
            revert IdError();
        }

        if (msg.sender != tweetToDelete.senderAddress){
            revert UnauthorizedAccess();
        }

        if (!tweetToDelete.isActive){
            revert DeletedTweet();
        }

        tweetToDelete.isActive = false;

        deletedTweetsCounter++;
        
        emit DeleteTweet(index, false);
    }

    /// @notice Add a new tweet to the map
    /// @dev Map index starts from 0
    /// @param message The message associated with the new tweet. Message can't be more than 280 characters
    function addTweet(string memory message) external {

        if (bytes(message).length > 280) revert InvalidMessage();

        tweets[totalTweetsCounter] = Tweet({
            id: totalTweetsCounter,
            tweetTime: block.timestamp,
            senderAddress: msg.sender,
            tweet: message,
            isActive: true,
            likes: 0
        });
        
        totalTweetsCounter++;

        emit NewTweet(totalTweetsCounter);
    }

    /// @notice Permits valid tweets to be liked
    /// @param index index of tweet to be likes
    function likeTweet(uint256 index) external{

        if(tweets[index].senderAddress == address(0)){
            revert IdError();
        }

        address[] storage likedTweetAdds = likesMapping[index];

         for (uint i = 0; i < likedTweetAdds.length; i++) {
            if (likedTweetAdds[i] == msg.sender) revert LikeTweetError();
        }

        Tweet storage tweetToEdit = tweets[index];
        if(!tweetToEdit.isActive) revert LikeTweetError();
        tweetToEdit.likes += 1;
        likedTweetAdds.push(msg.sender);

        emit LikeTweet(index, tweetToEdit.likes);
    }

    /// @notice Edit an existing tweet
    /// @param index The index of the tweet to be modified
    /// @param newMessage The new message to replace the existing message
    function editTweet(uint256 index, string calldata newMessage) external {

        if (bytes(newMessage).length > 280) revert InvalidMessage();

        if(tweets[index].senderAddress == address(0)){
            revert IdError();
        }

        Tweet storage tweetToEdit = tweets[index];

        //Ensures only tweet owners can edit tweets
        if (msg.sender != tweetToEdit.senderAddress){
            revert UnauthorizedAccess();
        }

        //Ensures onluy active tweets can be deleted
        if (!tweetToEdit.isActive){
            revert DeletedTweet();
        }

        tweetToEdit.tweet = newMessage;

        emit EditTweet(index, newMessage);
    }

    /// @notice Get all none deleted tweet from the map
    /// @return Tweet A list of all none deleted tweets
    function getTweets() external view returns (Tweet [] memory){

        Tweet[] memory allActiveTweets = new Tweet[](totalTweetsCounter-deletedTweetsCounter);
        uint256 indexTracker = 0;

         for (uint256 i = 0; i < totalTweetsCounter; i++) {
            if (tweets[i].isActive){
                allActiveTweets[indexTracker] = tweets[i];
                indexTracker++;
            }
        }

        return allActiveTweets;
    }

    /// @notice Gets the total number of none deleted tweets
    /// @return uint256 
    function getValidTweetsLength() external view returns (uint256){
        return totalTweetsCounter - deletedTweetsCounter;
    }

}

