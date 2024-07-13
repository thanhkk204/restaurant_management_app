"use client"
import { Switch } from "@/components/ui/switch"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"

import React, { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const value = useThemeContext()
  if (!value) return
  const { setSideBarType } = value

  useEffect(() => {
    if (window.localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
      // set state in useContext to change sideBar color in sideBar model
      setSideBarType("dark")
    } else {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
      setSideBarType("light")
    }
  }, [darkMode])

  function handleChecked(value: boolean) {
    if (value === false) {
      // Get value (booleen) in onCheckedChange and compare whether it's dark or light mode
      setDarkMode(false)
      window.localStorage.setItem("theme", "light")
    } else {
      setDarkMode(true)
      window.localStorage.setItem("theme", "dark")
    }
  }
  return <Switch checked={darkMode} onCheckedChange={handleChecked} />
}
