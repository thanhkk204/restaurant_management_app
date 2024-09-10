"use client"
import { useGetData } from "@/hooks/useGetdata"
import { useEffect, useMemo, useState } from "react"
import { DishType } from "../(admin)/dashboard/inventories/page"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/context/CartProvider"
import { CartItem } from "@/types/type"
import { signOut, useSession } from "next-auth/react"
import { ArrowDown, ArrowRight } from "lucide-react"
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse"
import { BrandSection } from "@/components/BrandSection"
import MenuSection from "@/components/MenuSection"
import {motion} from 'framer-motion'
import { OrderTableSection } from "@/components/OrderTableSection"
import { SwiperSliderShow } from "@/components/SwiperSliderShow"
import { TeamChefGallery } from "@/components/TeamChefGallery"
import { Testimonial } from "@/components/Testimonial"
import SubcribeSection from "@/components/SubcribeSection"
import 'aos/dist/aos.css';
import AOS from 'aos'

export default function RootPage() {
  
  // add to cart action
  const { addItem } = useCart()
  const handleAddToCart = (item: CartItem) => {
    addItem(item)
  }
  const MotionArrowRight = motion(ArrowRight);
  useEffect(()=>{
   AOS.init({
    duration: 500,
    easing: "ease-out",
    once: false, // Dừng lại hoạt ảnh sau khi nó xuất hiện lần đầu (false để lặp lại mỗi khi cuộn lại)
    mirror: false, // Hoạt ảnh xuất hiện khi cuộn lên,
    // disable: function() {
    //   var maxWidth = 600;
    //   return window.innerWidth < maxWidth;
    // }

   })
  },[])
  const { data: session, status } = useSession()
  return (
    <div className="w-full overflow-hidden pt-[160px]">

  <div className="text-white">
      {session ? (
        <p>Signed in as {session.user.email} {session.user.id} {status}</p>
      ) : (
        <p>Not signed in {status}</p>
      )}
    </div>
     {/* <button className="fixed bottom-5 right-5 py-5 px-5 rounded-3xl bg-orange-1 z-50" onClick={e=>scrollToTop(e)}>Scroll to Top</button> */}

      <section className="relative ">
        {/* Banner */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-9 md:gap-11 lg:gap-0">
          <div className="flex-1 overflow-x-hidden relative z-20 text-wrap" >
            <h1 className="text-5xl lg:text-8xl font-semibold font-serif text-light-text dark:text-dark-text capitalize text-wrap ">
              Welcome to our <span className="text-orange-1 dark:text-dark-primaryColor">greate</span> restaurant
            </h1>
            <p className="text__para text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio nemo ullam nostrum unde dolor reprehenderit
              quam nulla esse consectetur, cum quaerat ut qui est recusandae mollitia corporis quas facere nesciunt.</p>
          </div>
          {/* Image right */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[355px] h-[250px] sm:w-[455px] sm:h-[350px] md:w-[550px] md:h-[400px] overflow-hidden bannerBackGroundImage parallax_img relative z-20" />
          </div>

        </div>
        {/* image background parallax  */}
        <div className="absolute w-full h-full top-0 left-0 z-10">
          <MouseParallaxContainer className="w-full h-full" containerStyle={{ overflow: 'visible' }}>

            <MouseParallaxChild factorX={0.1} factorY={0.1} className="absolute left-[-35%] md:left-[-5%] bottom-[-10%] ">
              <Image src={"/images/leaf.png"} className="blur-[1px]" width={355} height={355} alt="image" />
            </MouseParallaxChild>

            <MouseParallaxChild factorX={0.1} inverted factorY={0.1} className="absolute right-[-35%] md:right-[-5%] top-0">
              <Image src={"/images/berry.png"} className="blur-[1px]" width={255} height={255} alt="image" />
            </MouseParallaxChild>

          </MouseParallaxContainer>

        </div>
      </section>

      <BrandSection />
      <MenuSection />

      <section id="aboutSection">
        {/* pizza information */}
        <div className="w-full py-6 md:py-10 flex flex-col md:flex-row gap-5">
          <div className="flex-1 flex items-center justify-center" data-aos="fade-right" data-aos-offset="-350">
            <Image
              src={"/images/pizza.png"}
              width={350}
              height={350}
              alt="dish"
            />
          </div>

          <div data-aos="fade-left" data-aos-offset="-350" className="flex-1 flex flex-col bounce-effect">
            <h1 className="text__heading">
              Pizza chicken prime
            </h1>
            <p className="text__para text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod aperiam
              esse suscipit, corporis fuga debitis, voluptate harum sit hic illo eos similique nisi quos
              rem consequatur, amet necessitatibus!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod aperiam
              esse suscipit, corporis fuga debitis, voluptate harum sit hic illo eos similique nisi quos
              rem consequatur, amet necessitatibus!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod aperiam
              esse suscipit, corporis fuga debitis, voluptate harum sit hic illo eos similique nisi quos
              rem consequatur, amet necessitatibus!
            </p>

            <div className="w-full flex justify-end md:justify-start">
              <motion.button
                className="w-fit my-3 md:my-5 px-3 py-2 rounded-full flex items-center justify-between font-semibold
               bg-light-text dark:bg-dark-text text-dark-text dark:text-light-text"
                initial={'initial'}
                whileHover="hover"
                animate={'initial'}
              >
                Explore
                <motion.span
                  className="ml-2 md:ml-3 w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold bg-light-warning dark:bg-light-primaryColor"

                >
                  <MotionArrowRight
                    variants={{
                      initial: {
                        x: 0,
                        opacity: 1,
                        transition: { duration: 0.4, ease: "easeIn" }
                      },
                      hover: {
                        x: [0, 20, -20], // Di chuyển sang phải 20px, rồi sang trái -20px, rồi trở lại vị trí ban đầu
                        opacity: [1, 0, 0],
                        transition: { duration: 0.4, ease: "easeIn", times: [0, 0.8, 1] },// Thời gian cho cả quá trình là 0.6 giây

                      },
                    }}
                  />
                </motion.span>
              </motion.button>
            </div>
          </div>

        </div>
        {/* Sushi information */}
        <div className="w-full py-6 md:py-10 flex flex-col md:flex-row gap-5">

          <div data-aos="fade-right" data-aos-offset="-350" className="flex-1 flex flex-col order-2 md:order-1">
            <h1 className="text__heading">
              Pizza chicken prime
            </h1>
            <p  className="text__para text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod aperiam
              esse suscipit, corporis fuga debitis, voluptate harum sit hic illo eos similique nisi quos
              rem consequatur, amet necessitatibus!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod aperiam
              esse suscipit, corporis fuga debitis, voluptate harum sit hic illo eos similique nisi quos
              rem consequatur, amet necessitatibus!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod aperiam
              esse suscipit, corporis fuga debitis, voluptate harum sit hic illo eos similique nisi quos
              rem consequatur, amet necessitatibus!
            </p>

            <div className="w-full flex justify-end md:justify-start">
              <motion.button
                className="w-fit my-3 md:my-5 px-3 py-2 rounded-full flex items-center justify-between font-semibold
               bg-light-text dark:bg-dark-text text-dark-text dark:text-light-text"
                initial={'initial'}
                whileHover="hover"
                animate={'initial'}
              >
                Explore
                <motion.span
                  className="ml-2 md:ml-3 w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold bg-light-warning dark:bg-light-primaryColor"

                >
                  <MotionArrowRight
                    variants={{
                      initial: {
                        x: 0,
                        opacity: 1,
                        transition: { duration: 0.4, ease: "easeIn" }
                      },
                      hover: {
                        x: [0, 20, -20], // Di chuyển sang phải 20px, rồi sang trái -20px, rồi trở lại vị trí ban đầu
                        opacity: [1, 0, 0],
                        transition: { duration: 0.4, ease: "easeIn", times: [0, 0.8, 1] },// Thời gian cho cả quá trình là 0.6 giây

                      },
                    }}
                  />
                </motion.span>
              </motion.button>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-offset="-350"  className="flex-1 order-1 md:order-2 flex items-center justify-center">
            <Image
              src={"/images/sushi.png"}
              width={350}
              height={350}
              alt="dish"
            />
          </div>

        </div>
      </section>

      <OrderTableSection />

      <SwiperSliderShow />
      <TeamChefGallery />
      <Testimonial />
      <SubcribeSection />
    </div>

  )
}
