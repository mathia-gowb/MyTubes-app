import React from 'react'
import {useContext, useEffect,useState} from 'react';
import { useLocation,Link } from "react-router-dom";
import UserContext from "../auth/AuthContext";

function SearchBar() {
    const {user} =useContext(UserContext);
    const [searchArray,setSearchArray] = useState([]);
    const [searchResults,setSearchResults] = useState([]);
    const {pathname} = useLocation();


    function searchInputHandler({target}){

        if(target.value.length>2){
            const queryRegex=new RegExp(`${target.value}`,'mi');
            const searchMatch = searchArray.filter((recipe)=>{
                return queryRegex.test(recipe.strMeal)
            })
            setSearchResults(searchMatch);
            return
        };
        setSearchResults([])
    }
    useEffect(()=>{
        //used to make the searchArray have unique recipes only
        const uniqueRecipes = [];
        const allRecipes = user.likedRecipes.concat(user.savedRecipes);
        allRecipes.forEach((recipe)=>{
            const isInUniqueArr=uniqueRecipes.filter((item)=>item.idMeal===recipe.idMeal);
            if(!isInUniqueArr.length){
                uniqueRecipes.push(recipe)
            }
        })
        setSearchArray(uniqueRecipes);
    },[user])
    //create the search results elements
     const searchResultsElements = searchResults.map((recipe)=>{
        return <Link to={`/recipe?id=${recipe.idMeal}`}><p>{recipe.strMeal}</p></Link>
    }) 

  return (
    <div className='search-bar-wrapper'>

    <div className="search-bar-inner-wrapper">
        <div className='search-bar'>        
        <input type='text' name="search" placeholder='Search Your Recipes' onInput={searchInputHandler}></input>
        <button className='search-icon'><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div class="search-results">
             {searchResultsElements}
        </div>
    </div>
  </div>
  )
}

export default SearchBar