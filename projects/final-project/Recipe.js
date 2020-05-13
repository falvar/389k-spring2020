var mongoose = require('mongoose'); 
mongoose.Promise = global.Promise

// Represents a review of a recepie
var reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    comment: {
        type: String
    },
    user: {
        type: String,
        required: true
    }
}); 


// Represents a recipe

var recipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    calories:{
        type: Number,
        min: 0.0,
        required: true 
    },
    instructions:{
        type: String,
        required: true 
    },
    user: {
        type: String,
        required: true
    },
    reviews:[reviewSchema]
});

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe; 