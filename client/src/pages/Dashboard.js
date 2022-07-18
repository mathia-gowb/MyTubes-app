import {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import UserContext from '../auth/AuthContext';
import RandomRecipes from '../components/RandomRecipes';
import LikedRecipes from '../components/LikedRecipes';
import SavedRecipes from '../components/SavedRecipes';
import SolidHeader from '../components/SolidHeader';
const axios = require('axios').default;
axios.defaults.withCredentials = true;

function Dashboard() {
  
  const {user,setUser} = useContext(UserContext);
  const [currentTab,setCurrentTab] = useState("Random-Recipes");

  return (
      <div className='page-wrapper'>
        <div id="recipes-content-wrapper">
          <SolidHeader showSearch={true} isDemo={user.isDemo}/>
          <nav className='nav-secondary'>
            <button className={currentTab==='Random-Recipes'&&"active-tab"} onClick={()=>setCurrentTab('Random-Recipes')}>
              <i class="fa-solid fa-shuffle"></i> Random recipes
            </button>
            <button className={currentTab==='Liked-Recipes'&&"active-tab"}  onClick={()=>setCurrentTab('Liked-Recipes')}>
              <i class="fa-regular fa-thumbs-up"></i> Liked ({user.likedRecipes&&user.likedRecipes.length})
            </button>
            <button className={currentTab==='Saved-Recipes'&&"active-tab"} onClick={()=>setCurrentTab('Saved-Recipes')}> 
              <i class="fa-regular fa-bookmark"></i> Saved ({user.likedRecipes&&user.savedRecipes.length}) 
            </button>
          </nav>
          <br/>
          {/* tabs */}
          {currentTab==='Random-Recipes'&&<RandomRecipes/>}
          {currentTab==='Liked-Recipes'&&<LikedRecipes/>}
          {currentTab==='Saved-Recipes'&&<SavedRecipes/>}
        </div>
      </div>

  )
}

export default Dashboard