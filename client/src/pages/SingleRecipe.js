import React, { useEffect } from 'react'
import InteractionBar from './InteractionBar'

function SingleRecipe() {
  useEffect(()=>{
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772')
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
    })
  },[])
  return (
    <div id="single-recipe-wrapper">    
      <h1 id="meal-name">How to make french fries</h1>
      <div id='meal-content' className='info-block'>
        <div id="recipe-image">
          <img src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg" alt="food"></img>  
          <InteractionBar/>
        </div>
        <div id="meal-info-wrapper">
          <div id="ingredients">
          <h2><i class="fa-solid fa-carrot"></i> Ingredients</h2>
          <ul>
            <li><i class="fa-solid fa-circle"></i> 10 bags</li>
            <li><i class="fa-solid fa-circle"></i> 10 bags</li>
            <li><i class="fa-solid fa-circle"></i> 10 bags</li>
            <li><i class="fa-solid fa-circle"></i> 10 bags</li>
            <li><i class="fa-solid fa-circle"></i> 10 bags</li>
            <li><i class="fa-solid fa-circle"></i> 10 bags</li>
            <li><i class="fa-solid fa-circle"></i> 10 bags</li>
            <li><i class="fa-solid fa-circle"></i> 10 bags</li>
          </ul>
          </div>
          <br></br>
          <div id="instructions">
          <h2><i class="fa-solid fa-stopwatch-20"></i> instructions</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, quis doloremque eos aliquam ratione quos repellendus, quisquam cumque libero voluptates hic, iusto optio error cupiditate sed molestiae dolor asperiores amet!</p>
          </div>
          
        </div>

      </div>
    </div>

  )
}

export default SingleRecipe