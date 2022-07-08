import React, { useEffect, useState } from 'react'
import RecipeLarge from './RecipeLarge'

function RecipeListLarge(props) {   
    const {category} = props;
    const [mealsElements,setMealsElements]=useState([])
    useEffect(()=>{
        //handles the searching by category -> gets data from mealdb api
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res)=>res.json())
        .then((data)=>{
            const {meals} = data;
            const mealsData=meals.map(meal=>{
                return <RecipeLarge 
                        imgSrc={meal.strMealThumb}
                        mealName ={meal.strMeal}
                        mealId={meal.idMeal}
                        mealCategory={category}
                        liked={true}
                        saved={true}
                        jsonData={meal}
                        />
             }
            )
            setMealsElements(mealsData)            
        })
    },[category])
    return (
    <section className="recipes-section">
        <h2 className='section-heading'>Explore {category} Recipes</h2>
        <div className='recipes-list random-recipes'>
        {mealsElements}
        </div>
    </section>
  )
}

export default RecipeListLarge