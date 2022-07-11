const userRecipes = require('../models/userRecipes-model');
function addLike(req,res){
    const {id:mealId}=req.query.id;
    const reqBody = req.body;
    userRecipes.findOneAndUpdate({email:req.email},{$addToSet:{likedRecipes:reqBody}},{ returnOriginal: false})
    .then((results)=>{
        console.log(results)
        res.status(204)
        .json({
            likedRecipes:results.likedRecipes
        })
    }).catch((error)=>{
        console.log(error)
        res.status(400)
        .json({
            message:'failed to add item to your likes'
        })
    })
}
module.exports = {addLike}