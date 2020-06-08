const pubSub = require('../pub-sub/pub-sub');

const TWEET_ADDED = 'TWEET_ADDED';

module.exports = {
  Query: {
    hello: (_, args) => `Hello ${args.from}`,
    getUser: (_, args, ctx) => ctx.dataSources.Users.findUser(args.id),
    getTweets: (_, args, ctx) => ctx.dataSources.Tweets.getTweetsForUser(args.userId),
    me: (_p, _a, context) => context.req.user,
  },
  Mutation: {
    tweet: (_, args, {req, dataSources}) => {
      let tweet = dataSources.Tweets.createTweet(req.user.id, args.message);
      pubSub.publish(TWEET_ADDED, { tweetAdded: tweet });
      return tweet;
    }
  },
  Subscription: {
    tweetAdded: {
      subscribe: () => pubSub.asyncIterator([TWEET_ADDED])
    }
  },
  Tweet: {
    createdBy: (parent, args, ctx) => ctx.dataSources.Users.findUser(parent.userId)
  },
  User: {
    tweets: (parent, args, ctx) => ctx.dataSources.Tweets.getTweetsForUser(parent.id)
  },
}