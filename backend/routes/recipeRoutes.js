const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { createRecipe, getAllRecipes, getMyRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.route('/recipe/new').post(isAuthenticatedUser,createRecipe)
router.route('/recipes/all').get(getAllRecipes)
router.route('/recipes/me').get(isAuthenticatedUser,getMyRecipes)
router.route('/recipe/:id').put(isAuthenticatedUser,updateRecipe).delete(isAuthenticatedUser,deleteRecipe)


module.exports = router