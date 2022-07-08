const userRecipes = require('../models/userRecipes-model');
function addLike(req,res){
    const {id:mealId}=req.query.id
    userRecipes.findOneAndUpdate({email:req.email},{$push:{mealId}})
}
module.exports = {addLike}