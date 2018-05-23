const db = require('./index');

// importing to create hash for passwords
const authHelpers = require("../auth/helpers");
const passport = require("../auth/passport");

const createAccount = (req, res, next) => {
  // frontend using password, backend using password_digest
  const hash = authHelpers.createHash(req.body.password);
  // console.log("createAccount hash: ", hash);
  db
    .none(
      "INSERT INTO employees (firstname, lastname, email, password_digest ) VALUES ( ${firstname}, ${lastname}, ${email}, ${password_digest})",
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password_digest: hash,
        // occupation: req.body.occupation,
        // gender: req.body.gender,
        // bio: req.body.bio,
        // zipcode: req.body.zipcode,
        // imgurl: req.body.imgurl,
      }
    )
    .then(() => {
      passport.authenticate("local", (err, user, info) => {
                console.log('custom cb', user)
                if (user) {
                  res.status(200).json({
                    status: "success",
                    data: user,
                    message: `created employee account: ${req.body.email} - ${req.body.firstname + " " + req.body.lastname}.`
                  });
                }
              })(req, res, next);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "error creating employee account",
        err
      });
    });
};

// function registerUser(req, res, next) {
//   console.log("before return")
//   return authHelpers
//     .createAccount(req)
//     .then(response => {
//       passport.authenticate("local", (err, user, info) => {
//         console.log('custom cb', user)
//         if (user) {
//           res.status(200).json({
//             status: "success",
//             data: user,
//             message: "Registered one user"
//           });
//         }
//       })(req, res, next);
//     })
//     .catch(err => {
//       console.log(error);
//       res.status(500).json({
//         status: "error",
//         error: err
//       });
//     });
// }

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
//   console.log("trying to login user", req.body);
//   passport.authenticate("local", {});
//   const authenticate = passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       res.status(500).send("error while trying to log in");
//     } else if (!user) {
//       res.status(401).send("invalid email/password");
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

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}


module.exports = {
  createAccount: createAccount,
  getAllEmployees: getAllEmployees,
  // registerUser: registerUser,
  logoutUser: logoutUser,
  // loginUser: loginUser,
};
