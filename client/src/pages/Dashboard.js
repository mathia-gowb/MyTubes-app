import exampleImage from '../assets/images/recipe-example.jpg';
import {useContext, useEffect, useState} from 'react';
import {Link, Outlet,useLocation} from 'react-router-dom'
import CategoriesTagCloud from '../components/CategoriesTagCloud';
import RecipeListLarge from '../components/RecipeListLarge';
import UserContext from '../auth/AuthContext';
import RandomUserRecipesContainer from '../components/RandomUserRecipes';
const axios = require('axios').default;
axios.defaults.withCredentials = true
function Dashboard() {
  const {user,setUser} = useContext(UserContext);
  const [currentCategory,setCurrentCategory] = useState("Seafood");
  const {pathname} = useLocation();
  const isDemo = /demo/gm.test(pathname);
  useEffect(()=>{
    setUser((prev)=>{
      return {...prev,isDemo}
    })
  },[])


  return (
    <div className='page-wrapper'>
      <div id="recipes-content-wrapper">
        <nav className='search-bar-wrapper'>
          <div className='search-bar'>        
            <input type='text' name="search" placeholder='Search Your Recipes'></input>
            <button className='search-icon'><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>

        </nav>

        <nav className='nav-secondary'>
          <button className="active-tab"><i class="fa-solid fa-shuffle"></i> Random recipes (20) </button>
          <button><i class="fa-regular fa-thumbs-up"></i> Liked (20)</button>
          <button> <i class="fa-regular fa-bookmark"></i> Saved (80) </button>
        </nav>

        <br/>
        <RandomUserRecipesContainer/>
        <CategoriesTagCloud categorySetter = {setCurrentCategory}/>
        <RecipeListLarge
          category={currentCategory}
        />

      </div>

    </div>
  )
}

export default Dashboard