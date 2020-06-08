const tweets = {};
const tweetsByUser = {};
let tweetId = 0;

function createTweet(userId, message) {
  let tweet = {
    id: ++tweetId, 
    message, 
    userId,
  }
  tweets[tweet.id] = tweet;
  addTweetToUsersTweets(tweet);
  return tweet;
}

function addTweetToUsersTweets(tweet) {
  if (!tweetsByUser[tweet.userId]) tweetsByUser[tweet.userId] = [];
  tweetsByUser[tweet.userId].push(tweet);
}

function getTweetsForUser(userId) {
  return tweetsByUser[userId] || [];
}

module.exports = {
  name: "Tweets",
  module: {
    createTweet,
    getTweetsForUser,
  }
}