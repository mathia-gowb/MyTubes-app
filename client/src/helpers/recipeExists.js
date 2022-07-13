
function isInUserData(mealId,userObject,dataType){
   console.log('iran jkl;asdfa')
    if(dataType === 'likes'){
       const found = userObject.likedRecipes.find(recipe=>recipe.idMeal===mealId);
       return found?true:false;
    }
    if(dataType === 'saved'){
        const found = userObject.savedRecipes.find(recipe=>recipe.idMeal===mealId);
        return found?true:false;  
    }
}

export default  isInUserData;