module.exports = {
  Query: {
    hello: (_, args) => `Hello ${args.from}`,
    getUser: (_, args, ctx) => ctx.dataSources.Users.findUser(args.id),
    getTweets: (_, args, ctx) => ctx.dataSources.Tweets.getTweetsForUser(args.userId),
    me: (_p, _a, context) => context.req.user,
  },
  Mutation: {
    tweet: (_, args, {req, dataSources}) => {
      return dataSources.Tweets.createTweet(req.user.id, args.message);
    }
  },
  Tweet: {
    createdBy: (parent, args, ctx) => ctx.dataSources.Users.findUser(parent.userId)
  },
  User: {
    tweets: (parent, args, ctx) => ctx.dataSources.Tweets.getTweetsForUser(parent.id)
  },
}