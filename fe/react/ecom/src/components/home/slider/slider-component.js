import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";

// Import Swiper styles
import 'swiper/css/bundle';
// import 'swiper/css/navigation';
// import "swiper/css/scrollbar";


// import required modules
import { Autoplay, Pagination} from "swiper";

export  function Banner() {
  return (
    <>
      <Swiper spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      
        modules={[Autoplay, Pagination]} className="mySwiper">
        <SwiperSlide>
            <div className="slider-inner">
                
                <img src="../images/slider-4.jpg" alt="" />
                <div className="slider-ad">
                    <span>New Arrival</span>
                    <h2 className="mb-5">Iphone 13 Pro Max </h2>
                    <a href="" className="btn btn-primary rounded-pill py-3 px-5">Shop Now</a>
                </div>
                
                
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-inner">
                <img src="../images/slider-3.jpg" alt="" />
                <div className="slider-ad">
                    <span>New Arrival</span>
                    <h2 className="mb-5">Iphone 13 Pro Max </h2>
                    <a href="" className="btn btn-primary rounded-pill py-3 px-5">Shop Now</a>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="slider-inner">
                <img src="../images/slider-2.jpg" alt="" />
                <div className="slider-ad">
                    <span>New Arrival</span>
                    <h2 className="mb-5">Iphone 13 Pro Max </h2>
                    <a href="" className="btn btn-primary rounded-pill py-3 px-5">Shop Now</a>
                </div>
            </div>
        </SwiperSlide>

       
      </Swiper>
    </>
  );
}










































// import React from "react";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
//   // import Swiper bundle with all modules installed;
//   import { Swiper, SwiperSlide } from "swiper/react";
// //   import Swiper from 'swiper/bundle';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';


//   // import styles bundle

//   const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,
  
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },
  
//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
  
//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//   });

// export function Banner(){

   



//     return(

//         <>
//          <Swiper className="mySwiper">
//         <SwiperSlide>Slide 1</SwiperSlide>
//         <SwiperSlide>Slide 2</SwiperSlide>
//         <SwiperSlide>Slide 3</SwiperSlide>
//         <SwiperSlide>Slide 4</SwiperSlide>
//         <SwiperSlide>Slide 5</SwiperSlide>
//         <SwiperSlide>Slide 6</SwiperSlide>
//         <SwiperSlide>Slide 7</SwiperSlide>
//         <SwiperSlide>Slide 8</SwiperSlide>
//         <SwiperSlide>Slide 9</SwiperSlide>
//       </Swiper>
//         </>
//     );
// }