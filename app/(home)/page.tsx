"use client"
import { useGetData } from "@/hooks/useGetdata"
import { useMemo, useState } from "react"
import { DishType } from "../(admin)/dashboard/inventories/page"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/context/CartProvider"
import { CartItem } from "@/types/type"
import { signOut } from "next-auth/react"
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

export default function RootPage() {
  const [activedLink, setActiveLink] = useState<string>("all")
  // Get all dishes and categories
  // const { data: dishes, loading: dishLoading } = useGetData<DishType[]>(
  //   "/api/inventories/dishes"
  // )
  // const { data: categories, loading: categoryLoading } = useGetData<DishType[]>(
  //   "/api/inventories/categories"
  // )
  // choose dish depend on category id
  // const categoryDishes = useMemo(() => {
  //   if (activedLink === "all") {
  //     return dishes
  //   } else if (dishes) {
  //     return [...dishes?.filter((dish) => dish.category_id === activedLink)]
  //   }
  // }, [activedLink, dishes])

  async function SignOut() {
    await signOut({ callbackUrl: "/login" })
  }
  // add to cart action
  const { addItem } = useCart()
  const handleAddToCart = (item: CartItem) => {
    addItem(item)
  }
  const MotionArrowRight = motion(ArrowRight);

  // const scrollToTop = (e: any) => {
  //   e.preventDefault()
  //   window.scrollTo({
  //     top: 100,
  //     left: 100,
  //     behavior: "smooth",
  //   });
  // };
  return (
    <>
     {/* <button className="fixed bottom-5 right-5 py-5 px-5 rounded-3xl bg-orange-1 z-50" onClick={e=>scrollToTop(e)}>Scroll to Top</button> */}

      <section className="relative ">
        {/* Banner */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-9 md:gap-11 lg:gap-0">
          <div className="flex-1 overflow-x-hidden relative z-20 text-wrap">
            <h1 className="text-5xl lg:text-8xl font-semibold font-serif text-light-text dark:text-dark-text capitalize text-wrap ">
              Welcome to our <span className="text-orange-1 dark:text-dark-primaryColor">greate</span> restaurant
            </h1>
            <p className="text__para text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio nemo ullam nostrum unde dolor reprehenderit
              quam nulla esse consectetur, cum quaerat ut qui est recusandae mollitia corporis quas facere nesciunt.</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[355px] h-[250px] sm:w-[455px] sm:h-[350px] md:w-[550px] md:h-[400px] overflow-hidden bannerBackGroundImage parallax_img relative z-20" />
          </div>

        </div>
        {/* image background parallax  */}
        <div className="absolute w-full h-full top-0 left-0 z-10">
          <MouseParallaxContainer className="w-full h-full" containerStyle={{ overflow: 'visible' }}>

            <MouseParallaxChild factorX={0.1} factorY={0.1} className="absolute bottom-[-10%] left-[-5%]">
              <Image src={"/images/leaf.png"} className="blur-[1px]" width={355} height={355} alt="image" />
            </MouseParallaxChild>

            <MouseParallaxChild factorX={0.1} inverted factorY={0.1} className="absolute top-0 right-[-5%]">
              <Image src={"/images/berry.png"} className="blur-[1px]" width={255} height={255} alt="image" />
            </MouseParallaxChild>

          </MouseParallaxContainer>

        </div>
      </section>

      <BrandSection />
      <MenuSection />

      <section>
        {/* pizza information */}
        <div className="w-full py-6 md:py-10 flex flex-col md:flex-row gap-5">
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={"/images/pizza.png"}
              width={350}
              height={350}
              alt="dish"
            />
          </div>

          <div className="flex-1 flex flex-col">
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

          <div className="flex-1 flex flex-col order-2 md:order-1">
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

          <div className="flex-1 order-1 md:order-2 flex items-center justify-center">
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

      {/* <Button onClick={() => SignOut()}>Sign out</Button>
      

      {/* <section className="bg-light-bg_2 dark:bg-dark-bg_2 px-3 py-4 grid grid-cols-2 [grid-auto-rows:200px] md:grid-cols-3 xl:grid-cols-4 gap-3">
        <div className="hidden xl:block col-span-1 row-span-2 px-3 py-4">
          <div className="xl:flex flex-col items-center justify-center h-full">
            <div
              onClick={() => setActiveLink("all")}
              className={cn(
                "w-full px-3 py-4 rounded-md cursor-pointer text-light-text dark:text-dark-text",
                activedLink === "all" ? "bg-dark-bg" : ""
              )}
            >
              Tất cả
            </div>
            {categories?.map((item) => (
              <div
                key={item._id}
                onClick={() => setActiveLink(item._id)}
                className={cn(
                  "w-full px-3 py-4 rounded-md cursor-pointer text-light-text dark:text-dark-text",
                  activedLink === item._id ? "bg-dark-bg" : ""
                )}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
        {categoryDishes?.map((dish) => (
          <div
            key={dish._id}
            onClick={() =>
              handleAddToCart({
                dish_id: dish._id,
                title: dish.title,
                image: dish.image[0],
                price: dish.price,
                quantity: 1,
              })
            }
            className="relative rounded-md overflow-hidden cursor-pointer hover:scale-95 transition-transform duration-200 ease-in"
          >
            <Image
              src={dish.image[0]}
              alt={dish.title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            <h2 className="absolute z-20 left-0 bottom-0 w-full h-[50px] flex items-center justify-center bg-blur_bg text-white">
              {dish.title}
            </h2>
          </div>
        ))}
      </section> */}
    </>
  )
}
