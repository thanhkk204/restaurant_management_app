"use client"
import React, { createContext, useContext, useState } from "react"

type ContextInstance = {
    isSideBarColose: boolean,
    setIsSideBarClose: (value: boolean) => void,
    sideBarColor: string,
    setSideBarColor: (value: string) => void,

}
const DashboardContext = createContext<ContextInstance | null>(null)
export default function DashboardContextProvider({children} : {children: React.ReactNode}) {

    const [isSideBarColose, setIsSideBarClose] = useState<boolean>(false)
    const [sideBarColor, setSideBarColor] = useState<string>('')

    
  return (
    <DashboardContext.Provider value={{
        isSideBarColose,
        setIsSideBarClose,
        sideBarColor,
        setSideBarColor
     }}>
        {children}
    </DashboardContext.Provider>
  )
}


export function useDashBoardContext() {
   return useContext(DashboardContext)
}