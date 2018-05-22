const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const db = require("../db/index");
const init = require("./passport");
const authHelpers = require("./helpers");

const options = {};

init();


passport.use(
  // getting email and password from req.body
  new LocalStrategy(options, (email, password, done) => {
    console.log("trying to authenticate");
    db
      .any("SELECT * FROM employees WHERE email=$1", [email])
      .then(rows => {
        const user = rows[0];
        console.log("user: ", user);
        
        if (!user) {
          return done(null, false);
        }
        if (!authHelpers.comparePass(password, user.password_digest)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch(err => {
        console.log("error: ", err);
        return done(err);
      });
  })
);

module.exports = passport;
