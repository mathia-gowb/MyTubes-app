import React from 'react'

function RecipeLarge(props) {
    const {imageSource,mealName,mealId,mealCategory}=props;
  return (
    <div className='recipe'>
    <div className='recipe-content'>
      <img className='recipe-image-small' src={imageSource} alt='food'/>
      <div className='interaction-bar'>
        <button className='add-to-favourites'>
         {/*  <i class="fa-solid fa-thumbs-up"></i> */}
          <i class="fa-regular fa-thumbs-up"></i>
        </button>
        
        <button className='save'>
         {/*  <i class="fa-solid fa-bookmark"></i> */}
         <i class="fa-regular fa-bookmark"></i>
        </button>
      </div>
    </div>
    <p className='categories'>Category | {mealCategory}</p>
    <p className='recipe-title'>{mealName}</p>
  </div>
  )
}

export default RecipeLarge