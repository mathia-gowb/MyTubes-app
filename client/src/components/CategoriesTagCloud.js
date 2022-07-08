import React, { useEffect, useState } from 'react';
const axios = require('axios');
axios.defaults.withCredentials = false;
function CategoriesTagCloud(props) {
    const [categoriesTags,setCategories] = useState(Array(5))
    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then((results)=>results.json()
        ).then((data)=>{
            const {categories:resCategories} =data;
            const categoriesElements = resCategories
            .map(category=><a href='#recipes-categories'><button id={category.strCategory}>{category.strCategory}</button></a>);
            setCategories(categoriesElements)
            
        })
    },[])
    function categoryClickHandler({target}){
        props.categorySetter(target.id)
    }
  return (
    <section className="recipes-section" id="recipes-categories">
    <h2 className='section-heading'>Explore by categories</h2>
    <div className='tag-cloud' onClick={categoryClickHandler}>
        {categoriesTags}
    </div>
  </section>
  )
}

export default CategoriesTagCloud