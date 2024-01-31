const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../controllers/user.js')


// code above groups routes below, because both share the same path "/register"
router.post('/register', user.registrationNewUser)

// router.route('/login')
//     .get(user.renderLoginForm)
//     .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/gearedmind/users/login' }),
//         user.loginUser)
// router.get('/login', users.renderLoginForm)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    user.loginUser)

router.get('/logout', user.logoutUser)

router.get('/:id', user.getUserName)

module.exports = router