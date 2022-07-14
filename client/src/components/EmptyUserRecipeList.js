import React from 'react'

function EmptyUserRecipeList(props) {
    const {fontAwesomeIconClass,role} = props;
    return (
      <div className='empty-user-recipes'>
          <p>
              You havent {role}d any recipes <br></br>press the {role} button <i class={`fa-regular ${fontAwesomeIconClass}`}></i> to add new recipes
          </p>
      </div>
    )
}

export default EmptyUserRecipeList