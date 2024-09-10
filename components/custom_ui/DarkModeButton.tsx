"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function DarkModeButton() {
    const [theme, setTheme] = useState<string>('dark');
    
    useEffect(() => {
      // Chỉ truy cập localStorage sau khi component đã được mount
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }, []);
    
      useEffect(() => {
        const element = document.documentElement; // html element
        if (theme === "dark") {
          element.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          element.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [theme]);
    return (
        <div className="relative max-w-[69px]">
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
