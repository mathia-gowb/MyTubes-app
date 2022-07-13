import React, { useContext, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import RefreshTopBarContext from '../contexts/RefreshTopBarContext';
import userContext from '../auth/AuthContext';
import isInUserData from '../helpers/recipeExists';
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function InteractionBar(props) {
    const {user,setUser} = useContext(userContext);
    const {refreshView,setRefreshView} =useContext(RefreshTopBarContext);
    const {liked,saved,mealId,fullMealJson}=props;
    //the liked state will change everytime when button clicked without having to refresh the whole block
    const [likedState,setLikedState] = useState(liked);
    const [savedState,setSavedState] = useState(saved);
    const {pathname} = useLocation();
    const isDemo =/demo/gm.test(pathname);
    function handleLike(){
        if(likedState){
            axios.delete(`http://localhost:5000/recipes/like?id=${mealId}&isDemo=${isDemo}`)
            .then((res)=>{
                //modify some state
                setLikedState((prev)=>!prev);
                setRefreshView((prev)=>!prev);
                //modify the users likedRecipes state
                const {likedRecipes} =res.data;
                setUser((prev)=>{
                    return {...prev,likedRecipes}
                  })
            }).catch((error)=>{
                console.log(error)
            })
        }else{
            axios.post(`http://localhost:5000/recipes/like?id=${mealId}&isDemo=${isDemo}`,
            fullMealJson)
            .then((res)=>{

                //when successful change the state of this button from liked = false to true
                setRefreshView((prev)=>!prev);
                setLikedState((prev)=>!prev);
                //modify the users likedRecipes state
                const {likedRecipes} =res.data;
                setUser((prev)=>{
                    return {...prev,likedRecipes}
                  })
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    function handleSave(){
        
        if(savedState){
            axios.delete(`http://localhost:5000/recipes/save?id=${mealId}&isDemo=${isDemo}`)
            .then((res)=>{

                //modify some state
                setSavedState((prev)=>!prev);
                setRefreshView((prev)=>!prev);
                //modify the users savedRecipes state
                const {savedRecipes} =res.data;
                setUser((prev)=>{
                    return {...prev,savedRecipes}
                  })

            }).catch((error)=>{
                console.log(error)
            })
        }else{
            axios.post(`http://localhost:5000/recipes/save?id=${mealId}&isDemo=${isDemo}`,
            fullMealJson)
            .then((res)=>{
                setSavedState((prev)=>!prev);
                setRefreshView((prev)=>!prev);
                //modify the users savedRecipes state
                const {savedRecipes} =res.data;
                setUser((prev)=>{
                    return {...prev,savedRecipes}
                  })
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    useEffect(()=>{
        //whenever the mealid changes or user data changes check if the meal is liked/saved
        const liked=isInUserData(mealId,user,'likes');
        const saved=isInUserData(mealId,user,'saved');
        setLikedState(liked);
        setSavedState(saved);
    },[mealId,refreshView])
    return (
      <div className='interaction-bar' id={`meal-${mealId}`}>
          <button className='add-to-favourites' onClick={handleLike}>
            {likedState?<i class="fa-solid fa-thumbs-up"></i>:<i class="fa-regular fa-thumbs-up"></i>}
          </button> 
          <button className='save' onClick={handleSave}>
            {savedState?<i class="fa-solid fa-bookmark"></i>:<i class="fa-regular fa-bookmark"></i>}
          </button>
      </div>
    )
}

export default InteractionBar