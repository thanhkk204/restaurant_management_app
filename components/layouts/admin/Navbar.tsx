"use client"
import { Bell, Home, Menu, Search, Settings,
   Text } from "lucide-react"
import { usePathname } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"


import ThemeToggle from "@/components/ThemeToggle"
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"
import SideBarModel from "@/components/SideBarModel"

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [lastScrollTop, setLastScrollTop] = useState<number>(0)
  const path = usePathname()

  // Get URL path name currently
  let pathName =  `${path.split("/").pop()?.charAt(0).toLocaleUpperCase()}${path.split("/").pop()?.slice(1)}`
  
  const value = useDashBoardContext()
  if (!value) return
  const { isSideBarColose, setIsSideBarClose } = value

  const handleScroll = () => {
    if (!navRef.current) return
    if (document.documentElement.scrollTop > lastScrollTop) {
      navRef.current.classList.add("hiddenNavbar")
    } else {
      navRef.current.classList.remove("hiddenNavbar")
    }
    setLastScrollTop(document.documentElement.scrollTop)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollTop])
  return (
    <nav
      ref={navRef}
      className="w-full sticky top-5 min-h-headerHeight bg-transparent text-white flex flex-col md:flex-row items-center justify-between px-10 gap-3 md:gap-0 transition-all  duration-400 delay-200"
    >
      <div className="nav_left flex gap-7 items-center">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center text-[15px] text-white">
            <Home width={15} height={15} /> /
            <h4 className="font-thin  dark:text-dark-textSoft">{pathName}</h4>
          </div>
          <h2 className="font-bold text-white">{pathName}</h2>
        </div>

        <div className="hidden md:block cursor-pointer">
          {isSideBarColose ? (
            <Text onClick={() => setIsSideBarClose(!isSideBarColose)} />
          ) : (
            <Menu onClick={() => setIsSideBarClose(!isSideBarColose)} />
          )}
        </div>
      </div>

      <div className="nav_right flex items-center gap-5">
        <form action="">
          <div className="px-3 py-3 bg-white dark:bg-dark-bg_2 rounded-lg dark:border dark:border-dark-bg_2 flex items-center gap-3 focus-within:shadow-input_shadown focus-within:shadow-cyan-500/50">
            <Search className="text-dark-bg_2 dark:text-dark-textSoft" />
            <input
              type="text"
              className="bg-transparent border-none outline-none text-dark-bg_2 dark:text-light-textSoft "
              placeholder="Type here"
            />
          </div>
        </form>
        <div className="flex items-center gap-2 px-5 text-white">
        <Bell width={20} height={20} className="cursor-pointer" />

         <SideBarModel/>
         
        </div>
        <ThemeToggle />
        <div className="flex items-center justify-center rounded-full overflow-hidden">
          <img src="/icons/logo.png" alt="avatar" width={50} height={50} />
        </div>
      </div>
    </nav>
  )
}
