import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../auth/AuthContext';
import RecipeLarge from './RecipeLarge';


function RecipeListLarge(props) {   
    const {pathname} = useLocation();
    const recipesElements = props.recipesArray.map((meal , index)=>{
        return <RecipeLarge
                    parentPath = {pathname} 
                    key = {index}
                    imgSrc={meal.strMealThumb}
                    mealName ={meal.strMeal}
                    mealId={meal.idMeal}
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