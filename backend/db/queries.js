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
      "INSERT INTO providers (firstname, lastname, email, password_digest ) VALUES ( ${firstname}, ${lastname}, ${email}, ${password_digest})",
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
            message: `created provider account: ${req.body.email} - ${req.body
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
        message: "error creating provider account",
        err
      });
    });
};

const getAllProviders = (req, res, next) => {
  db
    .any(
      "SELECT email, firstname, lastname, occupation, gender, bio, zipcode FROM providers"
    )
    .then(providers => {
      res.status(200).json({
        status: "success",
        providers: providers,
        message: `Retrieved all ${providers.length} providers`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("error in fetching providers");
    });
};

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

const getAllClientsByProviderId= (req, res, next) => {
  db.any('SELECT * FROM clients WHERE provider_id = ${provider_id}', {provider_id: req.params.provider_id})
  .then(clients => {
    res.status(200)
    .json({
      status: 'success',
      clients: clients,
      message: `Retrieved ${clients.length} clients`
    });
  })
};

const getClientById = (req, res, next) => {
  db.any('SELECT * FROM clients WHERE id=${id}', {id: req.params.client_id})
  .then(client => {
    res.status(200)
    .json({
      status: 'success',
      client: client,
      message: `Retrieved #${client[0].id}: ${client[0].firstname} ${client[0].lastname}`
    })
  })
}

module.exports = {
  createAccount,
  getAllProviders,
  logoutUser,
  getAllClientsByProviderId,
  getClientById,
};


// future queries
/*
// a list of tasks each individual needs to completed
SELECT client_objectives.client_id, clients.firstname, clients.lastname, clients.age, client_objectives.objective, client_objectives.accomplished FROM client_objectives JOIN clients ON client_objectives.client_id=clients.id;
*/