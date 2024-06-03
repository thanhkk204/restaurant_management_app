"use client"
import { Switch } from "@/components/ui/switch"

import React, { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  console.log('theme toggle')

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      window.localStorage.getItem('theme') === 'dark'
    ) {
        console.log('dark theme')
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    }
  }, [darkMode])

  function handleChecked(value: boolean) {
    if (value === false) {
      setDarkMode(false)
      window.localStorage.setItem("theme", "light")
    } else {
      setDarkMode(true)
      window.localStorage.setItem("theme", "dark")
    }
  }
  return <Switch
  checked={darkMode} 
  onCheckedChange={handleChecked} 
  />
}
