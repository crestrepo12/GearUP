var pgp = require("pg-promise")({});
//for local hosting
// var connectionString = 'postgres://localhost/gearup';
// for heroku
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

module.exports = db;