const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../controllers/user.js')
const { isLoggedIn, isUser } = require('../middlewares.js')
const authController = require('../controllers/authController');
const logoutController = require('../controllers/logoutController');
const refreshTokenController = require('../controllers/refresh.js');

const registerController = require('../controllers/registerController');


// router.get('/', refreshTokenController.handleRefreshToken);

// router.post('/register', registerController.handleNewUser);
// router.get('/logout', logoutController.handleLogout);

// router.post('/login', authController.handleLogin);

// code above groups routes below, because both share the same path "/register"
router.post('/register', user.registrationNewUser)

// router.route('/login')
//     .get(user.renderLoginForm)
//     .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/gearedmind/users/login' }),
//         user.loginUser)
//router.get('/login', users.renderLoginForm)

router.post('/login', passport.authenticate('local', { session: true }), user.loginUser)

// TODO, might want to add back: isLoggedIn, isUser,
router.get('/logout', user.logoutUser)

router.get('/user', isLoggedIn, user.getUserName)

module.exports = router