import React from 'react'
import { Link, } from 'react-router-dom'
import InteractionBar from './InteractionBar'

function UserRecipe(props) {
    const {mealId,mealName,imgSrc,fullMealJson,parentPath}=props
    console.log(parentPath)
    return (
    <div className='user-recipe'>
    <div className='recipe-content'>
        <img className='recipe-image-small' src={imgSrc} alt='food'/>
        <InteractionBar
            fullMealJson = {fullMealJson}
            mealId = {mealId}
        />
    </div>
    <p className='recipe-title'>
        <Link to={`recipe?id=${mealId}`}>
            {mealName}
        </Link>
    </p>
  </div>
  )
}

export default UserRecipe