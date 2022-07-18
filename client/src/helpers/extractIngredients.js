function extractIngredients(recipeObject) {

    let ingredientsArray = [];
    let counter = 1;
    while(true){
        const ingredient =recipeObject[`strIngredient${counter}`];
        const measure = recipeObject[`strMeasure${counter}`];
        //if the ingredient is empty/undefined stop fetching the ingredients and measure values
        if(ingredient===""||!ingredient){
            break
        }
        ingredientsArray.push(`${measure} ${ingredient}`);
        counter++
    }

    return ingredientsArray
}

export default extractIngredients