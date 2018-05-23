var express = require('express');
var router = express.Router();

const db = require("../db/queries");
const passport = require('../auth/passport');
const { loginRequired } = require("../auth/helpers");

// Post Methods
router.post('/create_account', db.createAccount);
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) { return next(err); }
        if(!user) {
            return res.status(401)
            .json({
                user: null,
                message: "Invalid email. Check your input and try again"
            })
        }
        req.login(user, (err) => {
            if(err) {
                return next(err)
            }
            res.status(200)
            res.json({
                user: req.user,
                message: `Welcome ${req.user.email}!`
            })
        })
    }) (req, res, next)

});


// Get Methods
router.get('/', (req, res, next) => res.status(200)
.send({title: "hello"}));
router.get('/logout', loginRequired, db.logoutUser);
router.get('/all_employees', db.getAllEmployees);

// Patch Methods 

module.exports = router;
