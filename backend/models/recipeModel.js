const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images : [
        {
            public_id: {
                type: String
            },
            url:{
                type: String
            }
        }
    ],
    ingredients: [
        {    
            type: String,
            required: true
               
        }
    ],
    detailsRecipe: {
        type: String,
        required: true
    },
    uploadedOn: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
    
});

module.exports = mongoose.model('Recipe',recipeSchema)