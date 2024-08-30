"use client"
import Image from 'next/image';
import React from 'react'

export default function DarkModeButton() {
    const [theme, setTheme] = React.useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
    
      const element = document.documentElement; // html element
    
      React.useEffect(() => {
        if (theme === "dark") {
          element.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          element.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [theme]);
    return (
        <div className="relative">
          <Image
            src={'/images/light-mode-button.png'}
            alt="light_button"
            width={69}
            height={69}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] hover:scale-110 transition-all duration-150 ease-in-out absolute right-0 z-10 ${
              theme === "dark" ? "opacity-0" : "opacity-100"
            } `}
          />
          <Image
            src={"/images/dark-mode-button.png"}
            alt="dark_button"
            width={69}
            height={69}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className=" cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] hover:scale-105 transition-all duration-150 ease-in-out"
          />
        </div>
      );
}
