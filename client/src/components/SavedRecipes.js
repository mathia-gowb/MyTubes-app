import { useContext } from "react";
import RecipeListLarge from "./RecipeListLarge"
import UserContext from "../auth/AuthContext";

function SavedRecipes() {
    const {user}=useContext(UserContext);
    return (
        <section className="recipes-section">
            <h2 className='section-heading'>Saved Recipes recipes</h2>
            <RecipeListLarge
                recipesArray={user.savedRecipes}
            />
        </section>
    )
}

export default SavedRecipes