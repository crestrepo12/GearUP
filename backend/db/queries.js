const db = require("./index");

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
        password_digest: hash
        // occupation: req.body.occupation,
        // gender: req.body.gender,
        // bio: req.body.bio,
        // zipcode: req.body.zipcode,
        // imgurl: req.body.imgurl,
      }
    )
    .then(() => {
      passport.authenticate("local", (err, user, info) => {
        console.log("custom cb", user);
        if (err) {
          return next(err);
        }
        req.login(user, err => {
          if (err) {
            return next(err);
          }
          res.status(200)
              .json({
            status: "success",
            user: req.user,
            message: `created employee account: ${req.body.email} - ${req.body
              .firstname +
              " " +
              req.body.lastname}.`
          });
        });
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

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

const getAllClientsByEmployee = (req, res, next) => {
  db.any('SELECT * FROM clients JOIN employee_clients_list ON clients.id=employee_clients_list.client_id WHERE employee_clients_list.employee_id=${employee_id}', req.params)
  .then(clients => {
    res.status(200)
    .json({
      status: 'success',
      clients: clients,
      message: `Retrieved ${clients.length} clients`
    });
  })
};

// const getOneClientByEmployee = (req, res, next) => {
//   db
//     .one('SELECT * FROM clients JOIN employee_clients_list ON clients.id=employee_clients_list.client_id WHERE employee_clients_list.employee_id=${employee_id}')
// }



module.exports = {
  createAccount: createAccount,
  getAllEmployees: getAllEmployees,
  logoutUser: logoutUser,
  getAllClientsByEmployee: getAllClientsByEmployee,
};
