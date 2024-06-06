"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

type ContextInstance = {
    isSideBarColose: boolean,
    setIsSideBarClose: (value: boolean) => void,
    sideBarColor: string,
    setSideBarColor: (value: string) => void,
    sideBarType: string,
    setSideBarType: (value: string) => void,

}
const DashboardContext = createContext<ContextInstance | null>(null)
export default function DashboardContextProvider({children} : {children: React.ReactNode}) {
  // All state to pass throughout all dashboard client components 
    const [isSideBarColose, setIsSideBarClose] = useState<boolean>(false)
    const [sideBarColor, setSideBarColor] = useState<string>('')
    const [sideBarType, setSideBarType] = useState<string>('')
  //  Check used user color was stored in local storge and then set up sideBar type to set default value
    useEffect(()=>{
      const currentTheme = window.localStorage.getItem('theme')
      if(currentTheme) setSideBarType(currentTheme)
     },[])

  return (
    <DashboardContext.Provider value={{
        isSideBarColose,
        setIsSideBarClose,
        sideBarColor,
        setSideBarColor,
        sideBarType,
        setSideBarType
     }}>
        {children}
    </DashboardContext.Provider>
  )
}

// function will be called and retrieved in needed children client components
export function useDashBoardContext() {
   return useContext(DashboardContext)
}