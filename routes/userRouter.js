const express = require('express');
const { registration, login, isLoggedin } = require('../controllers/userController');
const router = express.Router();


// register route
router.post('/register',registration);
// login route
router.post('/login',login)
// isLoggedin route
router.get('/isloggedin',isLoggedin)


module.exports = router
