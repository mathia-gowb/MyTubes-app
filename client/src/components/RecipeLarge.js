

import { Link } from 'react-router-dom';
import InteractionBar from './InteractionBar';

function RecipeLarge(props) {
    const {imgSrc,key,liked,saved,mealName,mealId,mealCategory,parentPath,jsonData}=props;
    
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
    <p className='recipe-title'>
      <Link to={`${parentPath}/recipe?id=${mealId}`}>
        {mealName}
      </Link>
    </p>
  </div>
  )
}

export default RecipeLarge