

import InteractionBar from './InteractionBar';

function RecipeLarge(props) {
    const {imgSrc,key,liked,saved,mealName,mealId,mealCategory,jsonData}=props;
    
  return (
    <div className='recipe' key={key}>
    <div className='recipe-content'>
      <img className='recipe-image-small' src={imgSrc} alt='food'/>
      <InteractionBar
          liked = {liked}
          saved = {saved}
          mealId = {mealId}
          fullMealJson={jsonData}
      />
    </div>
    {/* <p className='categories'>Category | {mealCategory}</p> */}
    <p className='recipe-title'>{mealName}</p>
  </div>
  )
}

export default RecipeLarge