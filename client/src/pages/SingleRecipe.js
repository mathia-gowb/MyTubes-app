import { useEffect,useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import UserContext from '../auth/AuthContext';
import InteractionBar from '../components/InteractionBar';
import extractIngredients from '../helpers/extractIngredients';

function SingleRecipe() {
  const {user}=useContext(UserContext);
  const navigate = useNavigate();
  const search = window.location.search;
  const urlParams = new URLSearchParams(search);
  const mealId = urlParams.get('id');
  const [meal,setMeal]=useState({}); 
  const [ingredients,setIngredients] = useState([]);
  
  useEffect(()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res)=>res.json())
    .then((data)=>{
      if(data.meals){
        setMeal(data.meals[0])
      }else{
        navigate('/404')
      }
    })
  },[])
  //sets ingredients when the meal result become available
  useEffect(()=>{
    setIngredients(extractIngredients(meal))
  },[meal])
  const ingredientsElements = ingredients.map((ingredient)=>{
    return <li><i class="fa-solid fa-circle"></i> {ingredient}</li>
  })
  return (
    <div id="single-recipe-wrapper">    
      <div id='meal-content' className='info-block'>
        <div id="main-meal-info">
          <div id="recipe-image">
            <img src={`${meal.strMealThumb}`}alt="food"></img>  
            <InteractionBar
              mealId = {meal.idMeal}
              fullMealJson={meal}
            />
          </div>
          <div className="main-text">
            <h1 id="meal-name">{meal.strMeal}</h1>

            <div className='more-meal-info'>
              <p  className="cap">Meal Category</p>
              <p className="cap-info">{meal.strCategory}</p>
            </div>
            <div className='more-meal-info'>
              <p className="cap">Area</p>
              <p className="cap-info">{meal.strArea}</p>
            </div>
            <div className='more-meal-info'>
              <p class="cap">Instructional Video</p>
              <a href={meal.strYoutube} target="__blank">
                <i class="fa-2x fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div id="meal-info-wrapper">
          <div id="ingredients">
          <h2><i class="fa-solid fa-carrot"></i> Ingredients</h2>
          <ul>
            {ingredientsElements}
          </ul>
          </div>
          <br></br>
          <div id="instructions">
          <h2><i class="fa-solid fa-stopwatch-20"></i> instructions</h2>
          <p>{meal.strInstructions}</p>
          </div>
          
        </div>

      </div>
    </div>

  )
}

export default SingleRecipe