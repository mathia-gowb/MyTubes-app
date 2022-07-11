import React from 'react'
import InteractionBar from '../pages/InteractionBar'

function UserRecipe(props) {
    const {liked,saved,mealId,mealName,imgSrc}=props
    return (
    <div className='recipe'>
    <div className='recipe-content'>
        <img className='recipe-image-small' src={imgSrc} alt='food'/>
        <InteractionBar
            liked = {liked}
            saved = {saved}
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