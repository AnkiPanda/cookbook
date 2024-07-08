const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Recipe = require("../models/recipeModel")
const User = require("../models/userModel")

exports.addRemoveLike = catchAsyncErrors(async(req,res,next)=>{
    const recipe = await Recipe.findById(req.body.id)

    if(!recipe.likedBy.includes(req.user._id)){
        recipe.likedBy.push(req.user._id)
        recipe.likes = recipe.likes + 1;
    }
    else{
        const index = recipe.likedBy.indexOf(req.user._id)
        recipe.likedBy.splice(index,1)
        recipe.likes = recipe.likes - 1;
    }
    

    await recipe.save({ validateBeforeSave: false}); 

    res.status(200).json({
        success : true,
        recipe
    })
})

exports.getLikedRecipes = catchAsyncErrors(async(req,res,next)=>{
    const recipes = await Recipe.find({"likedBy":req.user._id})
    res.status(200).json({
        success : true,
        recipes
    })
})

// exports.removeLike = catchAsyncErrors(async(req,res,next)=>{
//     const recipe = await Recipe.findById(req.body.id)

//     recipe.likes = recipe.likes - 1;

//     await recipe.save({ validateBeforeSave: false}); 

//     res.status(200).json({
//         success : true,
//         recipe
//     })
// })

