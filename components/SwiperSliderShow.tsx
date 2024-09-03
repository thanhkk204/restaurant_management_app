"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ChevronsLeft, ChevronsRight, Phone } from 'lucide-react';

export const SwiperSliderShow = () => {
  return (
    <div className='w-full relative'>
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1.5}
      spaceBetween={-150}
      loop={true}
      autoplay= {{
        delay: 3000,
        disableOnInteraction: false
      }}
      speed={1000}
      coverflowEffect={{
        rotate: 3,
        stretch: 0,
        depth: 100,
        modifier: 5,
        slideShadows: false,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}

      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        
      }}
      modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      // breakpoints={{
      //   640: {
      //     slidesPerView: 1,
      //     spaceBetween: -20,
      //   },
      //   768: {
      //     slidesPerView: 2,
      //     spaceBetween: -20,
      //   },
      //   1024: {
      //     slidesPerView: 3,
      //     spaceBetween: -20,
      //   },
      // }}
      className=' md:h-[550px]'
    >
        <SwiperSlide className='overflow-hidden rounded-[35px] h-full'>
          <div className="w-full h-full bg-[url('/images/bt1.jpg')] bg-center">

          </div>
        </SwiperSlide>
        <SwiperSlide className='overflow-hidden rounded-[35px] h-full'>
          <div className="w-full h-full bg-[url('/images/bt2.jpg')] bg-center">

          </div>
        </SwiperSlide>
        <SwiperSlide className='overflow-hidden rounded-[35px] h-full'>
          <div className="w-full h-full bg-[url('/images/bt3.jpg')] bg-center">

          </div>
        </SwiperSlide>
        <SwiperSlide className='overflow-hidden rounded-[35px] h-full'>
          <div className="w-full h-full bg-[url('/images/bt4.jpg')] bg-center">

          </div>
        </SwiperSlide>

        <SwiperSlide className='overflow-hidden rounded-[35px] h-full'>
          <div className='w-full h-full bannerBackGroundImage'>

          </div>
        </SwiperSlide>
    </Swiper>
      <div className="container slider-controler relative flex items-center justify-center py-6 md:py-10">
        <div className=' md:min-w-[650px] mx-auto relative flex items-center justify-between'>
        <div className="swiper-button-prev slider-arrow relative w-fit hidden md:block">
          <div className='w-16 h-16 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner'>
            <ChevronsLeft
              className='text-orange-1 dark:text-dark-primaryColor w-[25px]'
            />
          </div>
        </div>

          <div className="swiper-pagination shadow-2xl shadow-[#d4d4d4] dark:shadow-[#1094f4] py-3 px-4 bg-white dark:bg-[#101c44] rounded-3xl flex items-center w-fit"></div>

        <div className="swiper-button-next slider-arrow relative w-fit hidden md:block">
          <div className='w-16 h-16 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner'>
            <ChevronsRight
              className='text-orange-1 dark:text-dark-primaryColor w-[25px]'
             
            />
          </div>
        </div>

        </div>
        </div>
  </div>
  )
}
