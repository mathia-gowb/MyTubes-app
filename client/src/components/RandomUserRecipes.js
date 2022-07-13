import React from 'react'
import {useContext, useEffect, useState} from 'react';
import UserContext from '../auth/AuthContext';
import RefreshTopBarContext from '../contexts/RefreshTopBarContext';
import {createRandomUserRecipes} from '../helpers/createRandomUserRecipes'
import UserRecipe from './UserRecipe';
const axios = require('axios').default;

function RandomUserRecipesContainer() {
    const {user,setUser} = useContext(UserContext);
    const {refreshView} = useContext(RefreshTopBarContext);
    useEffect(()=>{
        //load the recipe from server on first login 
        axios.get(`http://localhost:5000/recipes?isDemo=${user.isDemo}`)
        .then((res)=>{
          const {likedRecipes,savedRecipes}=res.data;
          //save the recipes to the app context for reference
          setUser((prev)=>{
            return {...prev,likedRecipes,savedRecipes}
          })
        }).catch((error)=>{
        })
      },[]);
      
  return (
    <section className="recipes-section">
    <h2 className='section-heading'>Previously Interacted with</h2>
    <div className='recipes-list recent-recipes' style={{gridTemplateColumns:`repeat( ${user.likedRecipes.length}, 150px`}}>
        {
          
        user.likedRecipes
        .map((recipe)=>{
          return ( 
            <UserRecipe
              fullMealJson ={recipe}
              mealName = {recipe.strMeal}
              mealId = {recipe.idMeal}
              imgSrc = {recipe.strMealThumb}
            />
          )
        })
        }
    </div>
    </section>
  )
}

export default RandomUserRecipesContainer