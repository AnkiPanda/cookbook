const express = require('express');
const { registerUser, logout, login, getUserDetails, updateProfileData, updatePassword } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');
const { deleteRecipe } = require('../controllers/recipeController');

const router = express.Router()

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticatedUser,getUserDetails)
router.route('/me/update/profile').put(isAuthenticatedUser,updateProfileData)
router.route('/me/update/password').put(isAuthenticatedUser,updatePassword)


module.exports = router;