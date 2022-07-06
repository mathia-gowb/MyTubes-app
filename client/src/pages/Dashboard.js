import exampleImage from '../assets/images/recipe-example.jpg';
import {useState} from 'react';
import {Link} from 'react-router-dom'
import CategoriesTagCloud from '../components/CategoriesTagCloud';
import RecipeListLarge from '../components/RecipeListLarge';
const axios = require('axios').default;
axios.defaults.withCredentials = true
function Dashboard() {
  const [currentCategory,setCurrentCategory]=useState("Seafood");
  return (
    <div className='page-wrapper'>
      <div id="recipes-content-wrapper">
        <nav className='search-bar-wrapper'>
          <div className='search-bar'>        
            <input type='text' name="search" placeholder='Search for Recipe'></input>
            <button className='search-icon'><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>

        </nav>
        <nav className='nav-secondary'>
          <button className="active-tab"><i class="fa-solid fa-shuffle"></i> Random recipes (20) </button>
          <button><i class="fa-regular fa-thumbs-up"></i> Liked (20)</button>
          <button> <i class="fa-regular fa-bookmark"></i> Saved (80) </button>
        </nav>
        <section className="recipes-section">
        <h2 className='section-heading'>Recently added recipes</h2>
        <div className='recipes-list recent-recipes'>
          <div className='recipe'>
            <div className='recipe-content'>
              <img className='recipe-image-small' src={exampleImage} alt='food'/>
              <div className='interaction-bar'>
                <button className='add-to-favourites'>
                 {/*  <i class="fa-solid fa-thumbs-up"></i> */}
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                
                <button className='save'>
                 {/*  <i class="fa-solid fa-bookmark"></i> */}
                 <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
            <p className='recipe-title'>Mashonja with other foods that .......</p>
          </div>
          <div className='recipe'>
            <div className='recipe-content'>
              <img className='recipe-image-small' src={exampleImage} alt='food'/>
              <div className='interaction-bar'>
                <button className='add-to-favourites'>
                 {/*  <i class="fa-solid fa-thumbs-up"></i> */}
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                
                <button className='save'>
                 {/*  <i class="fa-solid fa-bookmark"></i> */}
                 <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
            <p className='recipe-title'>Mashonja</p>
          </div>
          <div className='recipe'>
            <div className='recipe-content'>
              <img className='recipe-image-small' src={exampleImage} alt='food'/>
              <div className='interaction-bar'>
                <button className='add-to-favourites'>
                 {/*  <i class="fa-solid fa-thumbs-up"></i> */}
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                
                <button className='save'>
                 {/*  <i class="fa-solid fa-bookmark"></i> */}
                 <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
            <p className='recipe-title'>Mashonja</p>
          </div>
          <div className='recipe'>
            <div className='recipe-content'>
              <img className='recipe-image-small' src={exampleImage} alt='food'/>
              <div className='interaction-bar'>
                <button className='add-to-favourites'>
                 {/*  <i class="fa-solid fa-thumbs-up"></i> */}
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                
                <button className='save'>
                 {/*  <i class="fa-solid fa-bookmark"></i> */}
                 <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
            <p className='recipe-title'>Mashonja</p>
          </div>
          <div className='recipe'>
            <div className='recipe-content'>
              <img className='recipe-image-small' src={exampleImage} alt='food'/>
              <div className='interaction-bar'>
                <button className='add-to-favourites'>
                 {/*  <i class="fa-solid fa-thumbs-up"></i> */}
                  <i class="fa-regular fa-thumbs-up"></i>
                </button>
                
                <button className='save'>
                 {/*  <i class="fa-solid fa-bookmark"></i> */}
                 <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
            <p className='recipe-title'>Mashonja</p>
          </div>
        </div>
        </section>
        <br/>
        <CategoriesTagCloud/>
        <RecipeListLarge
          category={currentCategory}
        />

      </div>

    </div>
  )
}

export default Dashboard