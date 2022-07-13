const userRecipes = require('../models/userRecipes-model');
//saves a recipe in the users saved recipes
function saveRecipe(req,res){
    console.log(req.body)
    const mealId=req.query.id;
    const reqBody = req.body;
    userRecipes.findOneAndUpdate({userEmail:req.email},{$addToSet:{'savedRecipes':reqBody}},{ returnOriginal: false})
    .then((results)=>{
        res.json({
            savedRecipes:results.savedRecipes
        })
    }).catch((error)=>{
        res.status(400)
        .json({
            message:'failed to save recipe'
        })
    })
}
//deletes saved recipe in the user saved recipes
function deleteRecipe(req,res){

    const mealId=req.query.id;
    const reqBody = req.body;
    userRecipes.findOneAndUpdate({userEmail:req.email},{$pull:{'savedRecipes':{idMeal:mealId}}},{returnOriginal:false})
    .then((results)=>{
        //okay
        res.json({
            savedRecipes:results.savedRecipes
        })
    }).catch((error)=>{
        res.status(400)
    })
}
module.exports = {saveRecipe,deleteRecipe}