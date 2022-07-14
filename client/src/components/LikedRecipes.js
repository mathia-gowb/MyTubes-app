import {useContext} from 'react';
import RecipeListLarge from './RecipeListLarge';
import UserContext from '../auth/AuthContext';
import EmptyUserRecipeList from './EmptyUserRecipeList';

function LikedRecipes() {
    const {user}=useContext(UserContext);
    return (
        <section className="recipes-section">
            <h2 className='section-heading'>Your favourite recipes</h2>
            {user.likedRecipes.length?<RecipeListLarge recipesArray={user.likedRecipes}/>:<EmptyUserRecipeList role={'like'} fontAwesomeIconClass={"fa-thumbs-up"}/>}

        </section>
    )
}

export default LikedRecipes