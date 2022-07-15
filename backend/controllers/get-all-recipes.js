const userRecipes = require('../models/userRecipes-model');
const users = require('../models/user-model');
function getAllRecipes(req,res){
    //check if user with the email exists in record
    users.findOne({email:req.email})
    .then((foundUser)=>{
        //if user was found proceed to recipes
        if(foundUser){
          
            userRecipes.findOne({userEmail:foundUser.email})
            .then((userRecipeCollection)=>{
                if(userRecipeCollection){
                    //if the user has recipe record send back the records
                    res.json(
                        {
                            likedRecipes : userRecipeCollection.likedRecipes,
                            savedRecipes : userRecipeCollection.savedRecipes
                        }
                    );
                }else{
                    //create the recipe record for the user
                    const userRecipe =new userRecipes({userEmail:req.email});
                    userRecipe.save()
                    .then((user)=>{
                        res.json({
                            likedRecipes: user.likedRecipes,
                            savedRecipes : user.savedRecipes
                        })
                    }).catch((err)=>{
                        //failed dependency
                        res.status(424)
                        .json({
                            message:"failed to create user recipe record"
                        })
                    }) 
                }
            }).catch((error)=>{
                res.json({
        
                    message:'user not found'
                })
            })
        }else{
            res.status(404)
            .json({
                message:'user not found'
            }) 
        }

    })

}
module.exports = getAllRecipes;