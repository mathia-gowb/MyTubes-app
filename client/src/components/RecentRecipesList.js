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
    const recipesLength = userRecipes.length
/*     function handleClick(event){
      console.log(event.targetElement)
    } */
    return (
      <Swiper
        loop={false}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          320:{
            slidesPerView: recipesLength>1?1.2:1,//if more than 1 recipe show the a part of last recipe
          },
          550: {
            slidesPerView: recipesLength>2?2.2:2,
          },
          720: {
            slidesPerView: recipesLength>3?3.2:3,
          },
          1024: {
            slidesPerView: recipesLength>5?5.2:5,
          },
          1200: {
            slidesPerView: recipesLength>6?6.2:6,
          },
          1300: {
            slidesPerView: recipesLength>7?7.2:7,
          }
        }}
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