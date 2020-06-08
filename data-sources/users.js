const bcrypt = require('bcrypt');

let users = {};
let userId = 0;
let usersByEmail = {};


function emailExists(email) {
  return !!usersByEmail[email]
}

function createUser({email, name, password}) {
  let user = {
    id: ++userId,
    name,
    email,
    hashedPassword: bcrypt.hashSync(password, 10),
  }
  users[user.id] = user;
  usersByEmail[user.email] = user;
  return user;
}

function verifyPassword(email, password) {
  let user = usersByEmail[email];
  if (!user) return false;
  if (bcrypt.compareSync(password, user.hashedPassword)) {
    return user;
  } else {
    return false;
  }
}

function findUser(id) {
  return users[id];
}

module.exports = {
  name: "Users",
  module: {
    emailExists,
    createUser,
    verifyPassword,
    findUser,
  }
}