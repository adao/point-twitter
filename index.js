const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./auth/passport');
const addSessionRoutes = require('./routes/add-session-routes');
const schema = require('./apollo/schema');
const resolvers = require('./apollo/resolvers');
const { createServer } = require('http');

const dsPath = require('path').join(__dirname, "data-sources");
const dataSources = {};
require('fs').readdirSync(dsPath).forEach((file) => {
  const result = require(`./data-sources/${file}`);
  dataSources[result.name] = result.module;
});

const apollo = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => dataSources,
  context: ({req}) => ({ req: req })
});

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'Z3]GJW!?9uP"/Kpe' }));
app.use(passport.initialize());
app.use(passport.session());
addSessionRoutes(app, passport);
apollo.applyMiddleware({app});

const port = 4000

const httpServer = createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}${apollo.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${port}${apollo.subscriptionsPath}`);
});