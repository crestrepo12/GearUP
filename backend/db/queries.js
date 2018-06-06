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

// const getCustomObjectiveListByClient = (req, res, next) => {
//   db
//   .any('SELECT client_objectives.client_id, clients.firstname, clients.lastname, clients.age, client_objectives.objective, client_objectives.accomplished FROM client_objectives JOIN clients ON client_objectives.client_id=clients.id WHERE clients.id=${client_id}', {client_id: req.params.client_id})
//   .then(client => {
//     res.status(200)
//     .json({
//       status: 'success',
//       client_custom_list: client,
//       message: `Retrieved client ${client.length} custom objectives from list`
//     })
//   })
// }

const getAllLifeSkillCategoriesById = (req, res, next) => {
  db
    .any('SELECT * FROM life_skills')
    .then(life_skills => {
      res.status(200)
      .json({
        status: 'success',
        life_skills: life_skills,
        message: `Retrieved ${life_skills.length} life skills categories`
      })
    })
}

const getJourneyGoalsByClientId = (req, res, next) => {
  db
    .any('SELECT clients.id AS client_id, clients.firstname, clients.lastname, life_skills.id AS life_skill_id, life_skills.categories, objectives.id AS objectives_id, objectives.objective, client_objectives.objective_accomplished FROM clients JOIN client_objectives ON client_objectives.client_id = clients.id JOIN objectives ON objectives.id = client_objectives.objective_id JOIN life_skills ON life_skills.id = objectives.life_skills_id WHERE clients.id=${client_id}', {client_id: req.params.client_id})
    .then(objectives => {
      res.status(200)
      .json({
        status: 'success',
        objectives: objectives,
        message: `Retrieved ${objectives.length} goal(s) from client's list`
      })
    })
}

function addClient(req, res, next) {
  db
    .none(
      "INSERT INTO clients (firstname, lastname, email, age, occupation, gender, residential_address, zipcode, phone_number, imgurl, bio, disability, medicaid, provider_id) VALUES (${firstname}, ${lastname}, ${email}, ${age}, ${occupation}, ${gender}, ${residential_address}, ${zipcode}, ${phone_number}, ${imgurl}, ${bio}, ${disability}, ${medicaid}, ${provider_id})",
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        occupation: req.body.occupation,
        gender: req.body.gender,
        residential_address: req.body.residential_address,
        zipcode: req.body.zipcode,
        phone_number: req.body.phone_number,
        imgurl: req.body.imgurl,
        bio: req.body.bio,
        disability: req.body.disability,
        medicaid: req.body.medicaid,
        provider_id: req.user.id
      }
    )
    .then(() => {
      res.status(200)
      .send("added child user bio into database");
    })
    .catch(err => {
      console.log('error adding client', err);
    });
}
/**
 * QUERIES LEFT TO DO:
 * add client
 * add client goal
 * edit client profile
 * 
 */



module.exports = {
  createAccount,
  getAllProviders,
  logoutUser,
  getAllClientsByProviderId,
  getClientById,
  getAllLifeSkillCategoriesById,
  getJourneyGoalsByClientId,
  addClient
};





// const getJourneyGoalsByClientId = (req, res, next) => {
//   db
//     .any('SELECT clients.id AS client_id, clients.firstname, clients.lastname, life_skills.id AS life_skill_id, life_skills.categories, objectives.objective, client_objectives.objective_accomplished FROM clients JOIN client_objectives ON client_objectives.client_id = clients.id JOIN objectives ON objectives.id = client_objectives.objective_id JOIN life_skills ON life_skills.id = objectives.life_skills_id WHERE clients.id=${client_id}', {client_id: req.params.client_id})
//     .then(data => {
//       res.status(200)
//       .json({
//         status: 'success',
//         data: data,
//         message: `Retrieved ${data.length} goal(s) from client's list`
//       })
//     })
// }