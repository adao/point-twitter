const { emailExists, createUser } = require('../data-sources/users').module;

function addSessionRoutes(app, passport) {
  app.post('/log_in', 
    passport.authenticate('local'), 
    function (req, res) {
      res.sendStatus(200);
    }
  );
  app.post('/log_out', function (req, res) {
    req.logout();
    res.sendStatus(200);
  });
  app.post('/sign_up', function(req, res, _next) {
    const {email, password, name} = req.body;
    if (emailExists(email)) {
      throw new Error("Email already exists");
    }
    let user = createUser({email, password, name});
    req.session.passport = { user: user.id }
    res.sendStatus(200);
  });
}

module.exports = addSessionRoutes;