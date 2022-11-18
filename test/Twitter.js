const hre = require("hardhat")
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Twitter contract", function () {
  async function twitterFixture() {
    const accounts = await hre.ethers.getSigners()
    const owner = accounts[0]
    const contract = await hre.ethers.getContractFactory("Twitter")

    const twitter = await contract.deploy()
  
    await twitter.deployed()
    return { twitter, owner, accounts }
  }

  describe("Deployment", function () {
    it("Should set the right contract owner", async function() {
      const { twitter, owner } = await loadFixture(twitterFixture)
      expect(await twitter.signer.address).to.equal(owner.address)
    })
  })

  describe("Add tweets", function () {
    it("Should allow users to create new tweet", async function () {
      const { twitter, owner } = await loadFixture(twitterFixture)
      await expect(twitter.connect(owner).addTweet("Test tweet")).to.emit(twitter, "NewTweet")
    })
  
    it("Should not allow more than 280 xter tweet", async function () {
      const { twitter, owner } = await loadFixture(twitterFixture)
      await expect(twitter.connect(owner).addTweet("Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nul")).to.be.revertedWithCustomError(twitter, "InvalidMessage")
    })
  
  })

  describe("Edit tweets", function () {
    it("Should allow users to edit owned tweets", async function () {
      const { twitter, owner } = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("tweet one")
      await expect(twitter.editTweet(0, "Modified tweet one")).to.emit(twitter, "EditTweet")
    })
  
    it("Should fail on invalid tweet index", async function () {
      const { twitter, owner} = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message")
      await expect(twitter.editTweet(1, "Edited message")).to.be.revertedWithCustomError(twitter, "IdError")
    })
  
    it("Should not allow users to edit deleted tweets", async function () {
      const { twitter, owner } = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message")
      await twitter.remove(0)
      await expect(twitter.editTweet(0, "Edit deleted tweet")).to.be.revertedWithCustomError(twitter, "DeletedTweet")
    })
  
    it("Should not allow users to edit others' tweets", async function () {
      const { twitter, owner, accounts } = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message")
      await expect(twitter.connect(accounts[1]).editTweet(0, "Change others' tweet")).to.be.revertedWithCustomError(twitter, "UnauthorizedAccess")
    })
  
    it("Should not allow edit with more than 280 xters", async function () {
      const { twitter, owner } = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message")
      await expect(twitter.editTweet(0, "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nul")).to.be.revertedWithCustomError(twitter, "InvalidMessage")
    })
  })

  describe("Delete tweets", function () {
    it("Should allow user to delete own tweets", async function () {
      const { twitter, owner } = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message")
      await expect(twitter.remove(0)).to.emit(twitter, "DeleteTweet")
    })

    it("Should not allow users to delete invalid tweets", async function () {
      const { twitter, owner} = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message")
      await expect(twitter.remove(1)).to.be.revertedWithCustomError(twitter, "IdError")
    })

    it("Should not allow users to delete deleted tweets", async function () {
      const { twitter, owner } = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message")
      await twitter.remove(0)
      await expect(twitter.remove(0)).to.be.revertedWithCustomError(twitter, "DeletedTweet")
    })

    it("Should not allow users to delete others' tweets", async function () {
      const { twitter, owner, accounts } = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message")
      await expect(twitter.connect(accounts[1]).remove(0)).to.be.revertedWithCustomError(twitter, "UnauthorizedAccess")
    })
  })

  describe("Get tweets", function () {
    it("Should have total count matching valid tweets", async function () {
      const { twitter, owner } = await loadFixture(twitterFixture)
      await twitter.connect(owner).addTweet("Test message one")
      await twitter.connect(owner).addTweet("Test message two")
      await twitter.connect(owner).remove(0)
      expect(await twitter.getValidTweetsLength()).to.equal(1)
    })

    it("Should return only valid tweets", async function () {
        const { twitter, owner } = await loadFixture(twitterFixture)
        await twitter.connect(owner).addTweet("Test message one")
        await twitter.connect(owner).addTweet("Test message two")
        await twitter.connect(owner).remove(0)
        var validTweets = await twitter.getTweets();
        for (var i = 0; i < validTweets.length; i++) {
            expect(validTweets[i].isActive).to.equal(true)
        }
        })
    
  })
})