import React from 'react';
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function InteractionBar(props) {
    const {liked,saved,mealId,fullMealJson}=props;
    function handleLike(){
        console.log('like')
        if(liked){
            axios.delete(`http://localhost:5000/recipes/like?id=${mealId}`)
            .then((res)=>{
                console.log(res)
                //modify some state
            }).catch((error)=>{
                console.log(error)
            })
        }else{
            axios.post(`http://localhost:5000/recipes/like`,{
                //json data to be saved for this meal
                mealData:fullMealJson
            })
            .then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    function handleSave(){
        if(saved){
            axios.delete(`http://localhost:5000/recipes/save?id=${mealId}`)
            .then((res)=>{
                console.log(res)
                //modify some state
            }).catch((error)=>{
                console.log(error)
            })
        }else{
            axios.post(`http://localhost:5000/recipes/save`,{
                mealData:fullMealJson
            })
            .then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    return (
      <div className='interaction-bar'>
          <button className='add-to-favourites' onClick={handleLike}>
            {liked?<i class="fa-solid fa-thumbs-up"></i>:<i class="fa-regular fa-thumbs-up"></i>}
          </button> 
          <button className='save' onClick={handleSave}>
            {saved?<i class="fa-solid fa-bookmark"></i>:<i class="fa-regular fa-bookmark"></i>}
          </button>
      </div>
    )
}

export default InteractionBar