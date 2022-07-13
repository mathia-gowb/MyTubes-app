import { useContext } from 'react'
import UserContext from '../auth/AuthContext';
import RecipeLarge from './RecipeLarge';


function RecipeListLarge(props) {   
    
    const recipesElements = props.recipesArray.map((meal , index)=>{
        return <RecipeLarge 
                key = {index}
                imgSrc={meal.strMealThumb}
                mealName ={meal.strMeal}
                mealId={meal.idMeal}
                mealCategory={"category"}
                jsonData={meal}
                />
     }
    );/* end of map function */
    return (
        <div className='recipes-list random-recipes'>
            {recipesElements}
        </div>

  )
}

export default RecipeListLarge