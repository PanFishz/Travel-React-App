const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../controllers/user.js')
const { isLoggedIn, isUser } = require('../middlewares.js')


router.post('/register', user.registrationNewUser)

router.post('/login', passport.authenticate('local', { session: true }), user.loginUser)

router.get('/logout', isLoggedIn, isUser, user.logoutUser)

router.get('/user', isLoggedIn, user.getUserName)

module.exports = router