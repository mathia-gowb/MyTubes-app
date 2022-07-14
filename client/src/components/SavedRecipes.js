import { useContext } from "react";
import RecipeListLarge from "./RecipeListLarge"
import UserContext from "../auth/AuthContext";
import EmptyUserRecipeList from "./EmptyUserRecipeList";

function SavedRecipes() {
    const {user}=useContext(UserContext);
    return (
        <section className="recipes-section">
            <h2 className='section-heading'>Saved Recipes recipes</h2>
            {user.savedRecipes.length?<RecipeListLarge recipesArray={user.savedRecipes}/>:<EmptyUserRecipeList role={'save'} fontAwesomeIconClass={"fa-bookmark"}/>}

        </section>
    )
}

export default SavedRecipes