const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/index");
const authHelpers = require("./helpers");

// console.log('=========> Passport  \n', passport)
//_LocalStrategy_ by default uses params username and password, options are a way to change the default like below.
const options = {
  usernameField: "email",
  passwordField: "password"
};

passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  console.log("deserialize user");
  db
    .one("SELECT * FROM employees WHERE email = ${email}", { email: email })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});
// console.log('==========> After \n passport.serializeUser', passport)

passport.use(
  // getting email and password from req.body
  new LocalStrategy(options, (email, password, done) => {
    // console.log("trying to authenticate");
    db
      .any("SELECT * FROM employees WHERE email=$1", [email])
      .then(rows => {
        const user = rows[0];
        // console.log("user: ", user);

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        if (!authHelpers.comparePass(password, user.password_digest)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user, { message: "All is well." });
      })
      .catch(err => {
        console.log("error from passport: ", err);
        return done(err);
      });
  })
);

// console.log('========> end passport:', passport)
module.exports = passport;
