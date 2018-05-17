const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost/gearup";
const db = pgp(connectionString);

// importing to create hash for passwords
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const createAccount = (req, res, next) => {
  // frontend using password, backend using password_digest
  const hash = authHelpers.createHash(req.body.password);
  console.log("createAccount hash: ", hash);
  db
    .none(
      "INSERT INTO employees (email, password_digest, firstname, lastname) VALUES (${email}, ${password_digest}, ${firstname}, ${lastname})",
      {
        email: req.body.email,
        password_digest: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        // occupation: req.body.occupation,
        // gender: req.body.gender,
        // bio: req.body.bio,
        // zipcode: req.body.zipcode,
        // imgurl: req.body.imgurl,
      }
    )
    .then(() => {
      res.send(
        `created employee account: ${req.body.email} - ${req.body.firstname, req.body.lastname}.
        }`
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "error creating employee account",
        err
      });
    });
};

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

const getAllEmployees = (req, res, next) => {
  db
    .any(
      "SELECT email, firstname, lastname, occupation, gender, bio, zipcode FROM employees"
    )
    .then(employees => {
      res.status(200).json({
        status: "success",
        employees: employees,
        message: `Retrieved all ${employees.length} employees`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("error in fetching employees");
    });
};

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
  getAllEmployees: getAllEmployees,
  registerUser: registerUser
  // loginUser: loginUser,
  // logoutuser: logoutUser,
};
