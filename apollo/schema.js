const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    tweets: [Tweet!]!
  }
  type Tweet {
    id: ID!
    message: String!
    userId: ID!
    createdBy: User
  }
  type Query {
    hello(from: String!): String
    me: User
    getUser(id: ID!): User
    getTweets(userId: ID!): [Tweet!]!
  }
  type Mutation {
    tweet(message: String!): Tweet
  }
`;
