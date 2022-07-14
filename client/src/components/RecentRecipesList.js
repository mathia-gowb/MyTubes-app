import React from 'react'

function RecentRecipesList(props) {
    const {userRecipes }= props;
    return (
    <div className='recipes-list recent-recipes' style={{gridTemplateColumns:`repeat( ${userRecipes.length}, 150px`}}>
        { userRecipes}
    </div>
  )
}

export default RecentRecipesList