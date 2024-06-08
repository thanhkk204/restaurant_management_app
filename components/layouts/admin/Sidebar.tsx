"use client"
import { Button } from "@/components/ui/button"
import { sideBarVariables } from "@/lib/constants"
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const path = usePathname()
  // Get values were passed in context
  const value = useDashBoardContext()
  if (!value) return
  const { isSideBarColose, sideBarColor, sideBarType } = value

  return (
    <div
      className={cn(
        "h-screen sticky top-0 p-5 hidden lg:block transition-[width] duration-500",
        isSideBarColose ? "w-[120px]" : "w-[350px]"
      )}
    >
      <div
        className={cn(
          "relative h-[calc(100vh-40px)] w-full overflow-y-hidden bg-light-bg_2 dark:bg-dark-bg_2' transition-colors duration-300 ease-out right-0 rounded-2xl px-4 py-3 overflow-x-hidden",
          sideBarType === "light"
            ? "bg-light-bg_2"
            : sideBarType === "dark"
            ? "bg-dark-bg_2"
            : ""
        )}
      >
        <div className="flex flex-col">
          <div className={"flex items-center gap-2 overflow-hidden py-2"}>
            <img
              src="/images/adminLogo.png"
              alt="adminLogo"
              width={60}
              height={60}
              className="bg-transparent"
            />

            <h2
              className={cn(
                "text-[18px] font-medium transition-opacity duration-500 whitespace-nowrap",
                isSideBarColose
                  ? "opacity-0 pointer-events-none select-none "
                  : "opacity-100"
              )}
            >
              Boot Dashboard
            </h2>
          </div>
          <div className="bg-gradient-to-r from-transparent via-gray-400 dark:via-[#FFFFFF66] opacity-75 to-transparent w-full h-[1px] border-none"></div>

          <ul className="py-5">
            {sideBarVariables.map((item, index) => (
              <li key={index}>
                <Link 
                href={item.link}
                style={path === item.link && !sideBarColor ?
                {background: '#051139'} :
                path === item.link && sideBarColor ?
                {background: sideBarColor} : {background: ''}}
                className={"group flex items-center py-4 gap-3 w-full px-3 rounded-lg cursor-pointer overflow-hidden max-h-fit group"}
                >
                <div 
                style={path === item.link ? {color: 'white'} : {color: item.color}}
                className={`min-w-[20px] group-hover:text-red-500 `} 
                >
                  {item.icon}
                </div>
                  
                <h4
                  className={cn(
                    "text-light-textSoft transition-transform duration-300 ease-out whitespace-nowrap",
                    isSideBarColose
                      ? "translate-x-[100px] opacity-25 pointer-events-none select-none"
                      : "translate-x-0 opacity-100",
                      path === item.link ? "text-white" : "dark:text-dark-textSoft"
                  )}
                >
                  {item.title}
                </h4>
                </Link>
                
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center">
            <div className="min-w-[100%]">
              <img
                className={cn(
                  "transition-all duration-700 origin-bottom-left ease-in-out min-w-[200px] mx-auto",
                  isSideBarColose
                    ? "opacity-0 scale-0"
                    : "opacity-100 scale-100"
                )}
                src="/images/logo2.png"
                width={200}
                height={100}
                alt="logo"
              />
            </div>
          </div>

          <div className=" w-full px-3">
            <Button
              className={cn(
                "w-full my-2 transition-all duration-500 hover:translate-y-[-2%] hover:opacity-75 bg-gradient-to-r from-[#11c4ef] to-[#1187ef] text-white dark:text-white overflow-hidden",
                isSideBarColose
                  ? "opacity-0 w-[50px] pointer-events-none select-none"
                  : "opacity-100 w-full"
              )}
            >
              Documentation
            </Button>
            <Button
              className={cn(
                "w-full my-2 transition-all duration-500 hover:translate-y-[-2%] hover:opacity-75",
                isSideBarColose
                  ? "opacity-0 w-[50px] pointer-events-none select-none"
                  : "opacity-100 w-full"
              )}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
