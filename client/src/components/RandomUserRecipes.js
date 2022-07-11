import React from 'react'
import {useContext, useEffect, useState} from 'react';
import UserContext from '../auth/AuthContext';
import {createRandomUserRecipes} from '../helpers/createRandomUserRecipes'
import UserRecipe from './UserRecipe';
const axios = require('axios').default;

function RandomUserRecipesContainer() {
    const {user,setUser} = useContext(UserContext);
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
          console.log(error)
        })
      },[]);

  return (
    <section className="recipes-section">
    <h2 className='section-heading'>liked recipes</h2>
    <div className='recipes-list recent-recipes' style={{gridTemplateColumns:`repeat( ${10}, 150px`}}>
        {
          
        createRandomUserRecipes(user.likedRecipes)
        .map((recipe)=>{
          console.log(user.likedRecipes)
          return ( 
            <UserRecipe
              mealName = {recipe.strMeal}
              liked = {true}
              mealId = {recipe.mealId}
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