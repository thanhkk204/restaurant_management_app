"use client"
import { Button } from "@/components/ui/button"
import { sideBarVariables } from "@/lib/constants"
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const path = usePathname()
  const value = useDashBoardContext()
  if (!value) return
  const { isSideBarColose, sideBarColor} = value

  return (
    <div
      className={cn(
        "h-screen sticky top-0 p-5 hidden lg:block transition-[width] duration-500",
        isSideBarColose ? "w-[120px]" : "w-[350px]"
      )}
    >
      <div className={"relative h-[calc(100vh-40px)] w-full overflow-y-hidden bg-light-bg_2 dark:bg-dark-bg_2 right-0 rounded-2xl px-4 py-3 overflow-x-hidden"}>
        <div className="flex flex-col">
          <div
            className={cn(
              "flex items-center gap-2 overflow-hidden border-b border-dark-secondaryColor py-2"
            )}
          >
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

          <ul className="py-5">
            {sideBarVariables.map((item, index) => (
              <li key={index}>
                <Link 
                href={item.link}
                style={path === item.link && !sideBarColor ?
                {background: '#051139'} :
                path === item.link && sideBarColor ?
                 {background: sideBarColor} : {background: ''}}
                className={cn(
                  "group flex items-center py-4 gap-3 w-full px-3 rounded-lg cursor-pointer overflow-hidden max-h-fit group",
                  // path === item.link ? 'bg-dark-bg': ''
                )}
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
              isSideBarColose ? "opacity-0 scale-0" : "opacity-100 scale-100"
             )}
             src="/images/logo2.png" 
             width={200} 
             height={100}
             alt="logo"
             />
             </div>
          </div>
          
          <div className="absolute bottom-3 left-0 w-full px-3">
           <Button 
           className={cn(
            "w-full my-2 transition-all duration-500",
            isSideBarColose ? "opacity-0 w-[50px] pointer-events-none select-none" : "opacity-100 w-full"
           )}
           >
            Documentation
           </Button>
           <Button 
           className={cn(
            "w-full my-2 transition-all duration-500",
            isSideBarColose ? "opacity-0 w-[50px] pointer-events-none select-none" : "opacity-100 w-full"
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
