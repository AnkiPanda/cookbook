const Recipe = require('../models/recipeModel');
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorhandler.js");

exports.createRecipe = catchAsyncErrors(async(req,res,next)=>{

    req.body.user = req.user._id;
    const recipe = await Recipe.create(req.body);
    res.status(201).json({
            success:true,
            recipe
    })
})

exports.getAllRecipes = catchAsyncErrors(async(req,res,next)=>{

    const recipes = await Recipe.find()
    res.status(201).json({
        success:true,
        recipes
    })
})

exports.getMyRecipes = catchAsyncErrors(async(req,res,next)=>{

    console.log(req.user._id)
    const recipes = await Recipe.find({"user" : req.user._id})
    res.status(201).json({
        success:true,
        recipes
    })
})

exports.updateRecipe = catchAsyncErrors(async(req,res,next)=>{

    const newRecipeData = {
        title : req.body.title,
        description : req.body.description,
        ingredients: req.body.ingredients,
        detailsRecipe: req.body.detailsRecipe
    }


    const recipe = await Recipe.findByIdAndUpdate(req.params.id,newRecipeData,{
        new: true,
        runValidators: true,
        findAndModified: false
    })
    res.status(201).json({
        success:true,
        recipe
    })
})

exports.deleteRecipe = catchAsyncErrors(async(req,res,next)=>{
    const recipe = await Recipe.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success:true,
        recipe
    })
})
