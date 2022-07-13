import React from 'react'
import InteractionBar from './InteractionBar'

function UserRecipe(props) {
    const {mealId,mealName,imgSrc,fullMealJson}=props
    return (
    <div className='recipe'>
    <div className='recipe-content'>
        <img className='recipe-image-small' src={imgSrc} alt='food'/>
        <InteractionBar
            fullMealJson = {fullMealJson}
            mealId = {mealId}
        />
    </div>
    <p className='recipe-title'>
        {mealName}
    </p>
  </div>
  )
}

export default UserRecipe