const userRecipes = require('../models/userRecipes-model');
function addLike(req,res){
    const {id:mealId}=req.query.id;
    const reqBody = req.body;
    userRecipes.findOneAndUpdate({email:req.email},{$set:{likedRecipes:reqBody}})
    .then((results)=>{
        res.status(204)
        .json(results)
    }).catch((error)=>{
        res.status(400)
        .json({
            message:'failed to add item to your likes'
        })
    })
}
module.exports = {addLike}