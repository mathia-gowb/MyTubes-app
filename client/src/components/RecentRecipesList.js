import "swiper/css/bundle";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {Navigation } from "swiper";

function RecentRecipesList(props) {
    const {userRecipes }= props;
    
/*     function handleClick(event){
      console.log(event.targetElement)
    } */
    return (
      <Swiper
        style={{height:'auto'}}
        slidesPerView={8}
        spaceBetween={10}
        loop={false}

        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {userRecipes}
      </Swiper>

    )
/*     <div id="user-recipes-list-wrapper" onClick={handleClick}>
      <button id="carousel-left-button" className='carousel-button'><i class="fa-solid fa-circle-chevron-left"></i></button>
        <div className='recipes-list recent-recipes' style={{gridTemplateColumns:`repeat( ${userRecipes.length}, 150px`}}>
            { userRecipes}
        </div>
      <button id="carousel-right-button" className='carousel-button'><i class="fa-solid fa-circle-chevron-right"></i></button>
    </div>
  ) */
}

export default RecentRecipesList