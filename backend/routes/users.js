var express = require('express');
var router = express.Router();
var db = require("../db/queries")


// Post Methods
router.post('/create_account', db.createAccount);

// Get Methods
router.get('/', (req, res, next) => res.status(200)
    .send({title: "hello"}))


// Patch Methods 

module.exports = router;
