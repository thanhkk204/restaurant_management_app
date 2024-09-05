"use client"
import { Bell, Home, LucideMenu, Menu, MenuSquare, Search, Settings, ShoppingCart, Text } from "lucide-react"
import { usePathname } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import CartModel from "@/components/CartModel"
import Image from "next/image"
import Link from "next/link"
import { useDebouncedCallback } from 'use-debounce';
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DarkModeButton from "@/components/custom_ui/DarkModeButton"
import { FcMenu } from "react-icons/fc"
import { Button } from "@/components/ui/button"


export const headerLink = [
  {
    link: "/",
    display: "Home"
  },
  {
    link: "/about",
    display: "About"
  },
  {
    link: "/menu",
    display: "Menu"
  },
  {
    link: "/gallery",
    display: "Gallery"
  },
  {
    link: "/blog",
    display: "Blog"
  },
]
export default function NavbarHome() {
  const navRef = useRef<HTMLElement>(null)
  const [lastScrollTop, setLastScrollTop] = useState<number>(0)
  const path = usePathname()

  const handleScroll = useDebouncedCallback(
    // function
    () => {
        if (!navRef.current) return
        if (document.documentElement.scrollTop > lastScrollTop) {
          navRef.current.classList.add("hiddenNavbar")
        } else {
          navRef.current.classList.remove("hiddenNavbar")
        }
        setLastScrollTop(document.documentElement.scrollTop)
      
    },
    // delay in ms
    10
  );
 

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollTop])
  return (
    <header className="fixed z-50 top-0 left-0 w-full h-[80px] transition-all duration-300"
    ref={navRef}
    >
      <div className="max-w-screen-2xl h-full mx-auto flex items-center justify-between">
     <div className="flex-1">
      <Image 
      width={80} 
      height={80}
      alt="logo"
      src={'/images/logo2.png'}
      />
     </div>
      
     <div className="flex-[2] hidden lg:block">
      <ul className="flex items-center justify-around">
      {
        headerLink.map((item, index)=>(
          <li 
           key={index}
          className={
            cn("hover:cursor-pointer px-4 py-2 text-lg text-light-text dark:text-dark-text hover:btnCustom dark:hover:btnCustom_dark transition-all duration-200 ease-in",
              path === item.link ? 'btnCustom dark:btnCustom_dark text-orange-1' : ''
            )
          }>
            <Link href={item.link}>{item.display}</Link>
          </li>
        ))
      }
      </ul>
     </div>

     <div className="flex-[2] flex items-center justify-end md:justify-around gap-3 md:gap-5 px-5 text-light-text dark:text-dark-text">

          <form className="hidden md:block">
            <div className="px-3 py-3 dark:px-3 dark:py-3 bg-white dark:bg-dark-bg_2 rounded-lg dark:border
           dark:border-dark-bg_2 flex items-center gap-3 btnCustom dark:btnCustom_dark cursor-pointer"
            >
              <Search className="text-light-text dark:text-dark-text" />
              <input
                type="text"
                className="bg-transparent border-none outline-none text-light-text dark:text-dark-text "
                placeholder="Type here"
              />
            </div>
          </form>

        <div className="flex items-center justify-end md:justify-center gap-3 md:gap-5">
              <Sheet>
                <SheetTrigger>
                  <div className="block lg:hidden text-light-text dark:text-dark-text px-2 py-2 dark:px-2 dark:py-2 btnCustom dark:btnCustom_dark ">
                    <Menu 
                     width={30}
                     strokeWidth={"1.5px"}
                     height={30}
                     className="cursor-pointer"
                       />
                  </div>

                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-full md:max-w-[640px] h-screen border-none">
                  <div className="relative bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text w-full h-screen px-6 py-12">
                    <ul style={{ height: 'calc(100% - 250px)' }} className="flex flex-col items-center justify-around w-full h-[calc(100% - 250px)] ">
                    {
                      headerLink.map((item, index) => (
                        <li key={index} className={
                          cn("w-full text-center hover:cursor-pointer text-lg text-light-text dark:text-dark-text hover:py-8 hover:btnCustom dark:hover:btnCustom_dark transition-all duration-200 ease-in py-8 dark:py-8",
                            path === item.link ? 'btnCustom dark:btnCustom_dark  text-orange-1 dark:text-dark-error' : ''
                          )
                        }>
                          <Link href={item.link}>{item.display}</Link>
                        </li>
                      ))
                    }
                    </ul>
                    <div className="absolute bottom-0 left-0 w-full h-[130px]  gap-5 px-5 py-8 bg-black/25 rounded-tl-[50px] rounded-tr-[50px]">
                      <SheetClose className="w-full">
                        <button className="text-[18px] w-full px-3 py-3 rounded-lg bg-gradient-to-r from-orange-1 to-red-1 text-white dark:text-white 
                         hover:scale-95 transition-transform duration-150 ease-linear"
                        >
                          Đóng
                        </button>
                      </SheetClose>
                    </div>
                  </div>

                </SheetContent>
              </Sheet>
          
          <CartModel />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-light-bg_2  dark:bg-dark-bg_2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

           <div className="hidden md:block">
          <DarkModeButton />

           </div>
        </div>
      </div>

      </div>
    </header>
    // <nav
    //   ref={navRef}
    //   className=" w-full sticky  max-h-headerHeight bg-transparent flex flex-col md:flex-row items-center justify-between px-10 py-3  gap-3 md:gap-0 transition-all  duration-400 delay-200"
    // >
    //   <div className="nav_left flex gap-7 items-center">
    //     <div className="hidden lg:block">
    //       <div className="flex flex-col">
    //         <div className="flex gap-2 items-center text-[15px] text-white">
    //           <Home width={15} height={15} />
    //           <h4 className="font-thin text-light-bg dark:text-dark-textSoft">
    //             {routeSegments.map((item, index) => {
    //               if (index === routeSegments.length - 1) {
    //                 return <span key={index}>{item}</span>
    //               }
    //               return <span key={index}>{item} / </span>
    //             })}
    //           </h4>
    //         </div>
    //         <h2 className="font-bold text-white py-1">{pathName}</h2>
    //       </div>
    //     </div>

    //     <div className="hidden lg:block cursor-pointer">
    //       {isSideBarColose ? (
    //         <Text onClick={() => setIsSideBarClose(!isSideBarColose)} />
    //       ) : (
    //         <Menu onClick={() => setIsSideBarClose(!isSideBarColose)} />
    //       )}
    //     </div>
    //   </div>

    //   <div className="nav_right flex items-center gap-5">
    //     <form action="">
    //       <div className="px-3 py-3 bg-white dark:bg-dark-bg_2 rounded-lg dark:border dark:border-dark-bg_2 flex items-center gap-3 focus-within:shadow-input_shadow focus-within:shadow-cyan-500/50">
    //         <Search className="text-dark-bg_2 dark:text-dark-textSoft" />
    //         <input
    //           type="text"
    //           className="bg-transparent border-none outline-none text-dark-bg_2 dark:text-light-textSoft "
    //           placeholder="Type here"
    //         />
    //       </div>
    //     </form>
    //     <div className="flex items-center gap-2 px-5 text-light-text dark:text-dark-text">
       
    //       <CartModel/>

    //       <Bell width={20} height={20} className="cursor-pointer" />
  
    //       <SideBarModel />
    //     </div>
    //     <ThemeToggle />
    //     <div className="flex items-center justify-center rounded-full overflow-hidden">
    //       <Image src="/images/logo2.png" alt="avatar" width={50} height={50} />
    //     </div>
    //   </div>
    // </nav>
  )
}
