const { emailExists, verifyPassword, findUser } = require('../data-sources/users').module;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  }, function(username, password, done) {
    if (!emailExists(username)) {
      return done(null, false, { message: "Incorrect username/password"})
    }
    let user = verifyPassword(username, password);
    if (!user) {
      return done(null, false, { message: "Incorrect username/password"})
    }
    return done(null, user);
  }
))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  let user = findUser(id);
  done(null, user);
});

module.exports = passport;