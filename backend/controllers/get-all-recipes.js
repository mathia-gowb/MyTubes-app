const userRecipes = require('../models/userRecipes-model');
function getAllRecipes(req,res){

    userRecipes.find({email:req.email})
    .then((results)=>{
        const user = results[0];
        if(results.length){
            res.json(
                {
                    likedRecipes : user.likedRecipes,
                    savedRecipes : user.savedRecipes
                }
            );
        }else{
            res.status(404)
            .json({
                message:'user not found'
            })
        }
    }).catch((error)=>{
        res.json({

            message:'user not found'
        })
    })
}
module.exports = getAllRecipes;