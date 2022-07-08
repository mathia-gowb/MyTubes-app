const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRecipesSchema = new Schema({
    userEmail:String,
    likedRecipes:Array,
    savedRecipes:Array,
})

const userRecipesModel = mongoose.model('recipes',userRecipesSchema);
module.exports = userRecipesModel;