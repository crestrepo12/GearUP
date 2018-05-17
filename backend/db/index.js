var pgp = require("pg-promise")({});
var connectionString = 'postgres://localhost/gearup';
var db = pgp(connectionString);

module.exports = db;