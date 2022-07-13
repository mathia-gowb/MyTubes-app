const userRecipes = require('../models/userRecipes-model');
function addLike(req,res){
    const {id:mealId}=req.query.id;
    const reqBody = req.body;
    userRecipes.findOneAndUpdate({userEmail:req.email},{$addToSet:{'likedRecipes':reqBody}},{ returnOriginal: false})
    .then((results)=>{
        res.json({
            likedRecipes:results.likedRecipes,
        })
    }).catch((error)=>{
        res.status(400)
        .json({
            message:'failed to add item to your likes'
        })
    })
}
function deleteLike(req,res){
    const mealId=req.query.id;
    const reqBody = req.body;
    console.log(`delete a meal with an id of ${mealId}`)
    userRecipes.findOneAndUpdate({userEmail:req.email},{$pull:{'likedRecipes':{idMeal:mealId}}},{returnOriginal:false})
    .then((results)=>{
        console.log(results)
        //okay
        res.json({
            likedRecipes:results.likedRecipes
        })
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports = {addLike,deleteLike}