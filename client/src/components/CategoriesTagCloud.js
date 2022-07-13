import React, { useEffect, useState } from 'react';
const axios = require('axios');
axios.defaults.withCredentials = false;

function CategoriesTagCloud(props) {
    const [categoriesTags,setCategoriesTags] = useState(Array(5));
    const [categoriesElements,setCategoriesElements] =useState([]);
    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then((results)=>results.json()
        ).then((data)=>{
            const {categories} =data;
            setCategoriesTags(categories);
        })
    },[])
    function categoryClickHandler({target}){
        props.categorySetter(target.id)
    }
    //when props.currentgategory changes rerender the  category tagcloud and highlight current tag
    useEffect(()=>{
        const elements= categoriesTags.map(category=>{
            const mealCategory = category.strCategory
            return <button id={mealCategory} className={mealCategory===props.currentCategory&&'active-category'}>{mealCategory}</button>
            }
        );
        setCategoriesElements(elements)
    },[categoriesTags,props.currentCategory])

  return (
    <section className="recipes-section" id="recipes-categories">
    <h2 className='section-heading'>Explore by categories</h2>
    <div className='tag-cloud' onClick={categoryClickHandler}>
        {categoriesElements}
    </div>
  </section>
  )
}

export default CategoriesTagCloud