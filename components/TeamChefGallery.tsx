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
import { ChevronsLeft, ChevronsRight, Facebook, FacebookIcon, Instagram, Phone, PhoneCall, Twitter } from 'lucide-react';
import { HeadingSection } from './HeadingSection';

export const TeamChefGallery = () => {
  return (
    <div className='w-full relative bg-light-bg_2 dark:bg-dark-bg_2'>
        <div className='py-6 md:py-10'>
         <HeadingSection title={'Our Restaurant Chef'} desc={'Five Star world chef'}/>

        </div>
    <Swiper
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      speed={1000}
      pagination={{ el: '.swiper-pagination-chef', clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next-chef',
        prevEl: '.swiper-button-prev-chef',
        
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      breakpoints={{
        0: {
          slidesPerView: 1.4,
          spaceBetween: 25
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 0
        },
        992: {
          slidesPerView: 2,
          spaceBetween: -25
        },
        1380: {
          slidesPerView: 2.6,
          spaceBetween: -150
        },
        1880: {
          slidesPerView: 2.8,
          spaceBetween: -450
        }
      }}
      className='h-fit w-full'
    >
       <SwiperSlide className='overflow-hidden pb-12'>
          <div className='rounded-[35px] h-fit max-w-[450px] product_shadow dark:product_shadow_dark mx-auto'>
          <div className=' flex flex-col items-center px-3 py-3 md:px-5 md:py-5'>
            <div className='w-full overflow-hidden rounded-3xl flex items-center justify-center'>
              <Image
               className='block object-cover rounded-3xl'
                src={"/images/chef/c1.jpg"}
                alt='chef'
                width={350}
                height={350}
              />
            </div>
            <h1 className='font-semibold font-serif text-2xl leading-7 py-3 md:py-5 text-light-text dark:text-dark-text'>Chef&apos;s Name</h1>
            <div className=' flex items-center justify-center'>
             <div className='px-5'>
             <Facebook
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Twitter 
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Instagram
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
            </div>
          </div>
          </div>
      </SwiperSlide>
       <SwiperSlide className='overflow-hidden pb-12'>
          <div className='rounded-[35px] h-fit max-w-[450px] product_shadow dark:product_shadow_dark mx-auto'>
          <div className=' flex flex-col items-center px-3 py-3 md:px-5 md:py-5'>
            <div className='w-full overflow-hidden rounded-3xl flex items-center justify-center'>
              <Image
               className='block object-cover rounded-3xl'
                src={"/images/chef/c2.jpg"}
                alt='chef'
                width={350}
                height={350}
              />
            </div>
            <h1 className='font-semibold font-serif text-2xl leading-7 py-3 md:py-5 text-light-text dark:text-dark-text'>Chef&apos;s Name</h1>
            <div className=' flex items-center justify-center'>
             <div className='px-5'>
             <Facebook
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Twitter 
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Instagram
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
            </div>
          </div>
          </div>
      </SwiperSlide>
       <SwiperSlide className='overflow-hidden pb-12'>
          <div className='rounded-[35px] h-fit max-w-[450px] product_shadow dark:product_shadow_dark mx-auto'>
          <div className=' flex flex-col items-center px-3 py-3 md:px-5 md:py-5'>
            <div className='w-full overflow-hidden rounded-3xl flex items-center justify-center'>
              <Image
               className='block object-cover rounded-3xl'
                src={"/images/chef/c3.jpg"}
                alt='chef'
                width={350}
                height={350}
              />
            </div>
            <h1 className='font-semibold font-serif text-2xl leading-7 py-3 md:py-5 text-light-text dark:text-dark-text'>Chef&apos;s Name</h1>
            <div className=' flex items-center justify-center'>
             <div className='px-5'>
             <Facebook
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Twitter 
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Instagram
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
            </div>
          </div>
          </div>
      </SwiperSlide>
       <SwiperSlide className='overflow-hidden pb-12'>
          <div className='rounded-[35px] h-fit max-w-[450px] product_shadow dark:product_shadow_dark mx-auto'>
          <div className=' flex flex-col items-center px-3 py-3 md:px-5 md:py-5'>
            <div className='w-full overflow-hidden rounded-3xl flex items-center justify-center'>
              <Image
               className='block object-cover rounded-3xl'
                src={"/images/chef/c4.jpg"}
                alt='chef'
                width={350}
                height={350}
              />
            </div>
            <h1 className='font-semibold font-serif text-2xl leading-7 py-3 md:py-5 text-light-text dark:text-dark-text'>Chef&apos;s Name</h1>
            <div className=' flex items-center justify-center'>
             <div className='px-5'>
             <Facebook
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Twitter 
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Instagram
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
            </div>
          </div>
          </div>
      </SwiperSlide>
       <SwiperSlide className='overflow-hidden pb-12'>
          <div className='rounded-[35px] h-fit max-w-[450px] product_shadow dark:product_shadow_dark mx-auto'>
          <div className=' flex flex-col items-center px-3 py-3 md:px-5 md:py-5'>
            <div className='w-full overflow-hidden rounded-3xl flex items-center justify-center'>
              <Image
               className='block object-cover rounded-3xl'
                src={"/images/chef/c5.jpg"}
                alt='chef'
                width={350}
                height={350}
              />
            </div>
            <h1 className='font-semibold font-serif text-2xl leading-7 py-3 md:py-5 text-light-text dark:text-dark-text'>Chef&apos;s Name</h1>
            <div className=' flex items-center justify-center'>
             <div className='px-5'>
             <Facebook
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Twitter 
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
             <div className='px-5'>
             <Instagram
              className='px-3 py-3 rounded-xl cursor-pointer btnCustom dark:btnCustom_dark text-light-text dark:text-dark-text
               hover:text-orange-1 dark:hover:text-blue-1 transition-colors ease-in'
              width={45}
              height={45}
              />
             </div>
            </div>
          </div>
          </div>
      </SwiperSlide>

    </Swiper>
    <div className="container py-0 px-0 pb-6 md:pb-8 slider-controler relative flex items-center justify-center">
        <div className='md:min-w-[650px] mx-auto relative flex items-center justify-between'>
        <div className="swiper-button-prev-chef slider-arrow relative w-fit hidden md:block">
          <div className='w-16 h-16 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner'>
            <ChevronsLeft
              className='text-orange-1 dark:text-dark-primaryColor w-[25px]'
            />
          </div>
        </div>

          <div className="swiper-pagination-chef shadow-2xl shadow-[#d4d4d4] dark:shadow-[#1094f4] py-3 px-4 bg-white dark:bg-[#101c44] rounded-3xl flex items-center w-fit"></div>

        <div className="swiper-button-next-chef slider-arrow relative w-fit hidden md:block">
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
