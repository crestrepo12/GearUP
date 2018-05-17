const pgp = require("pg-promise")({});
const connectionString = 'postgres://localhost/gearup';
const db = pgp(connectionString);

// importing to create hash for passwords
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const createAccount = (req, res, next) => {
    const hash = authHelpers.createHash(req.body.password);
  console.log("createAccount hash: ", hash);
  db
    .none("INSERT INTO employees(email, password_digest, firstname, lastname, occupation, gender, bio, zipcode, phone_number, imgurl) VALUES (${email}, ${password}, ${firstname}, ${lastname}, ${occupation}, ${gender}, ${bio}, ${zipcode}, ${phone_number}, ${imgurl})", {
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        occupation: req.body.occupation,
        gender: req.body.gender,
        bio: req.body.bio,
        zipcode: req.body.zipcode,
        imgurl: req.body.imgurl

      }
    ).then(() => {
        res.send(
          `created user: ${req.body.username} Is this person a mentor?: ${
          req.body.ismentor
          }`
        );
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("error creating user");
    })
}

function registerUser(req, res, next) {
  return authHelpers
    .createAccount(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        if (user) {
          res.status(200).json({
            status: "success",
            data: user,
            message: "Registered one user"
          });
        }
      })(req, res, next);
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({
        status: "error",
        error: err
      });
    });
}

// const loginUser = (req, res, next) => {
//   passport.authenticate("local", {});
//   const authenticate = passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       res.status(500).send("error while trying to log in");
//     } else if (!user) {
//       res.status(401).send("invalid username/password");
//     } else if (user) {
//       req.logIn(user, function (err) {
//         if (err) {
//           res.status(500).send("error");
//         } else {
//           res.status(200).send({ ...req.user, password_digest: null });
//         }
//       });
//     }
//   });
//   return authenticate(req, res, next);
// };

module.exports = {
  createAccount: createAccount,
  // loginUser: loginUser,
  // logoutuser: logoutUser,
  registerUser: registerUser
};