import {useContext} from 'react';
import RecipeListLarge from './RecipeListLarge';
import UserContext from '../auth/AuthContext';

function LikedRecipes() {
    const {user}=useContext(UserContext);
    return (
        <section className="recipes-section">
            <h2 className='section-heading'>Your favourite recipes</h2>
            <RecipeListLarge
                recipesArray={user.likedRecipes}
            />
        </section>
    )
}

export default LikedRecipes