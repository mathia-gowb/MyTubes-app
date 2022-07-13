import { useState,useEffect } from "react";
import RandomUserRecipesContainer from "./RandomUserRecipes";
import CategoriesTagCloud from "./CategoriesTagCloud";
import RecipeListLarge from "./RecipeListLarge";

export default function RandomRecipes(props) {
    const [category,setCategory] = useState("Seafood");
    const [mealsArray,setMealsArray]=useState([])
    useEffect(()=>{
        //handles the searching by category -> gets data from mealdb api
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res)=>res.json())
        .then((data)=>{
            const {meals} = data;
            setMealsArray(meals)            
        })
    },[category])

    return (
      <>
        <RandomUserRecipesContainer/>
        <CategoriesTagCloud
            currentCategory = {category}
            categorySetter = {setCategory}
        
        />
        <section className="recipes-section">
        <h2 className='section-heading'>Explore {category} Recipes</h2>
        <RecipeListLarge  
          recipesArray={mealsArray}
        />
        </section>
      </>
    )
}
