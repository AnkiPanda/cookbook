const express = require('express')
const { isAuthenticatedUser } = require('../middleware/auth')
const {addRemoveLike, getLikedRecipes } = require('../controllers/likeRecipeController')

const router = express.Router()

router.route("/like/addRemove").put(isAuthenticatedUser, addRemoveLike)
router.route("/likedrecipes").get(isAuthenticatedUser, getLikedRecipes)

module.exports = router;