import React from 'react'
import {useContext, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../auth/AuthContext';
import RefreshTopBarContext from '../contexts/RefreshTopBarContext';
import {createRandomUserRecipes} from '../helpers/createRandomUserRecipes'
import EmptyUserRecipeList from './EmptyUserRecipeList';
import RecentRecipesList from './RecentRecipesList';
import UserRecipe from './UserRecipe';
const axios = require('axios').default;

function RandomUserRecipesContainer() {
    const {user,setUser} = useContext(UserContext);
    const {refreshView} = useContext(RefreshTopBarContext);
    const {pathname} = useLocation();
    const isDemo = /demo/gm.test(pathname);
    useEffect(()=>{
        //load the recipe from server on first login 
        axios.get(`http://localhost:5000/recipes?isDemo=${isDemo}`)
        .then((res)=>{
          const {likedRecipes,savedRecipes}=res.data;
          //save the recipes to the app context for reference
          setUser((prev)=>{
            return {...prev,likedRecipes,savedRecipes,isDemo}
          })
        }).catch((error)=>{
        })
      },[]);
    const [userRecipes,setUserRecipes]=useState([]);

    useEffect(()=>{
      const recipes = user.likedRecipes.map((recipe)=>{
        return ( 
          <UserRecipe
            parentPath = {pathname}
            fullMealJson ={recipe}
            mealName = {recipe.strMeal}
            mealId = {recipe.idMeal}
            imgSrc = {recipe.strMealThumb}
          />
        )
      })
      setUserRecipes(recipes);
    },[user.likedRecipes])

  return (
    <section className="recipes-section">
    <h2 className='section-heading'>Previously liked recipes</h2>
      {userRecipes.length?<RecentRecipesList userRecipes={userRecipes}/>:<EmptyUserRecipeList role={"like"} fontAwesomeIconClass={"fa-thumbs-up"} />}
    </section>
  )
}

export default RandomUserRecipesContainer