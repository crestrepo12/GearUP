var express = require('express');
var router = express.Router();
const db = require("../db/queries");
const passport = require('../auth/local');

// Post Methods
router.post('/create_account', db.createAccount);
router.post('/login', passport.authenticate("local"), db.loginUser);

// Get Methods
router.get('/', (req, res, next) => res.status(200)
    .send({title: "hello"}));

router.get('/all_employees', db.getAllEmployees);


// Patch Methods 

module.exports = router;
