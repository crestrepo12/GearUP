const bcrypt = require("bcryptjs");
const db = require("../db/index");

// Compare userPassword from the request to dbPassword from the database
function comparePass(userPassword, dbPassword) {
    // dbPassword has hash and salt
    return bcrypt.compareSync(userPassword, dbPassword);
}

function createHash(password) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function loginRequired(req, res, next) {
    // if the user is logged in, passport will have attached
    // the user to it
    if (!req.user) {
      res.status(401)
         .json({status: "Please log in."});
      return;
    }
    next();
  }

module.exports = {
    comparePass,
    createHash,
    loginRequired
};