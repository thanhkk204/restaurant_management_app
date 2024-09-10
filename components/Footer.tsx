"use client"
import Image from "next/image"
import { FaFacebookF, FaInstagramSquare, FaTwitter, FaYoutube } from "react-icons/fa"
import { CiClock1 } from "react-icons/ci";
import { headerLink } from "./layouts/home/Navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineCopyright } from "react-icons/ai";

export const Footer = () => {
  const path = usePathname()
  return (
    <div className='w-full bg-light-bg_2 dark:bg-dark-bg_2'>
     <div className="container h-fit py-0">
        <div className='py-6 md:py-12 w-full flex flex-col lg:flex-row gap-3 lg:gap-5 justify-between'>
            <div className='w-full flex-[1.5] flex flex-col'>
               <div className="overflow-hidden w-[150px] h-[150px] flex items-center justify-center">
               <Image
               className="object-cover"
               width={150}
               height={150}
               alt="logo"
               src={"/images/logo2.png"}
               />
               </div>
               <p className="text__para leading-6 md:leading-7 text-wrap pb-4 md:pb-6 my-0 text-start">
                Lorem ipsum, dolor sit amet consectetur adipisicing elitercitationem neque repellendus  necessitatibus nam sit ducimus officia laborum!
               </p>

               <div className="flex items-center gap-4 md:gap-5">
                   <div className="w-[50px] h-[50px] rounded-full social_btn_shadow dark:social_btn_shadow_dark
                   flex items-center justify-center cursor-pointer transition-all ease-in">
                    <FaFacebookF
                     className="font-medium text-[20px]"
                      />
                   </div>
                   <div className="w-[50px] h-[50px] rounded-full social_btn_shadow dark:social_btn_shadow_dark
                   flex items-center justify-center cursor-pointer transition-all ease-in">
                    <FaTwitter
                     className="font-medium text-[20px]"
                      />
                   </div>
                   <div className="w-[50px] h-[50px] rounded-full social_btn_shadow dark:social_btn_shadow_dark
                   flex items-center justify-center cursor-pointer transition-all ease-in">
                    <FaInstagramSquare
                     className="font-medium text-[20px]"
                      />
                   </div>
                   <div className="w-[50px] h-[50px] rounded-full social_btn_shadow dark:social_btn_shadow_dark
                   flex items-center justify-center cursor-pointer transition-all ease-in">
                    <FaYoutube
                     className=" font-medium text-[20px]"
                      />
                   </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
               <h1 className="text__heading text-3xl py-3 md:py-5 font-serif font-semibold">
                Open hours
               </h1>
               <ul>
                <li className="flex items-center gap-1 text__para text-light-text dark:text-dark-text py-2 my-0">
                <CiClock1 className="text-orange-1 dark:text-purple-1 font-semibold text-[21px]"/>
                  <p>Mon-Fri: 9am - 22pm</p>
                </li>
                <li className="flex items-center gap-1 text__para text-light-text dark:text-dark-text py-2 my-0">
                <CiClock1 className="text-orange-1 dark:text-purple-1 font-semibold text-[21px]"/>
                  <p>Fri-Sun: 10am - 23pm</p>
                </li>
               </ul>
            </div>

            <div className="flex-1 flex flex-col">
               <h1 className="text__heading text-3xl py-3 md:py-5 font-serif font-semibold">
                Links
               </h1>
            <ul className="flex flex-col">
              {
                headerLink.map((item, index) => (
                  <li
                   key={index} 
                  className={
                    cn("hover:cursor-pointer px-4 py-2 text-lg text-light-text dark:text-dark-text transition-all duration-200 ease-in",
                      path === item.link ? 'text-orange-1' : ''
                    )
                  }>
                    <Link href={item.link}>{item.display}</Link>
                  </li>
                ))
              }
            </ul>
            </div>
            <div className="flex-1 flex flex-col">
               <h1 className="text__heading text-3xl py-3 md:py-5 font-serif font-semibold">
                Company
               </h1>
               <ul>
                <li className="text__para text-light-text dark:text-dark-text py-2 my-0">
                  <p>Team & Condition</p>
                </li>
                <li className=" text__para text-light-text dark:text-dark-text py-2 my-0">
                  <p>Privacy Policy</p>
                </li>
                <li className=" text__para text-light-text dark:text-dark-text py-2 my-0">
                  <p>Cookie Policy</p>
                </li>
               </ul>
            </div>
        </div>
      <p className="separate_line"></p>

        <div className="w-full flex items-center justify-center py-3 md:py-5">
          <div className="capitalize flex items-center w-fit gap-1 text-light-text dark:text-dark-text">
            Copyright <AiOutlineCopyright /> 2024 <span className="font-semibold text-orange-1 dark:text-purple-1">Mr.Thanh.</span> All Rights Reserved
          </div>
        </div>
     </div>
    </div>
  )
}
