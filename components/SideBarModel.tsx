"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { colorsVariables } from "@/lib/constants"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"
import { Facebook, Home, Instagram, Mail, MapPin, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Switch } from "./ui/switch"

const { purple, green, orange, red, gray, blue } = colorsVariables

const colors = [purple, green, blue, orange, red, gray]

export default function SideBarModel() {
  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor, setSideBarColor, sideBarType, setSideBarType } = value

  return (
    <Sheet>
      <SheetTrigger>
        <Settings width={20} height={20} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="border-none max-w-[250px]">
        <div className="bg-dark-bg_2 w-full h-screen p-6">
          <div className="pb-4">
            <h2 className="text-[20px] text-light-bg_2 dark:text-dark-text font-medium font-sans">
              Argon Configurator
            </h2>
            <p className="text-[15px] text-light-textSoft dark:text-dark-textSoft">
              See our dashboard options.
            </p>
          </div>
          <div className="separate_line"></div>

          <div className="py-5">
            <h4 className="text-light-text dark:text-dark-text py-2 font-sans text-[18px] font-semibold">
              Side Nav Colors
            </h4>
            <div className="flex items-center gap-2 px-3">
              {colors.map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  onClick={() => setSideBarColor(color)}
                  className="w-[25px] h-[25px] rounded-full border border-white hover:border-transparent transition-[border] duration-300 ease-in cursor-pointer"
                ></div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-light-text dark:text-dark-text py-2">
              <h4 className="text-light-text dark:text-dark-text font-sans text-[18px] font-semibold">
                Sidenav Type
              </h4>
              <p className="text-[14px] text-light-textSoft dark:text-dark-textSoft">
                Choose between 2 different sidenav types.
              </p>
            </div>
            <div className=" w-full flex items-center px-4 py-2 gap-3 font-medium ">
              <button
                onClick={() => setSideBarType("light")}
                className={cn(
                  "flex-grow border border-blue-1 rounded-md py-2 px-2 text-white dark:text-blue-1 bg-transparent cursor-pointer hover:translate-y-[-2%] transition-transform hover:shadow-input_shadown hover:shadow-cyan-500/50",
                  sideBarType === "light"
                    ? "bg-gradient-to-r from-[#11c4ef] to-[#1187ef]"
                    : ""
                )}
              >
                White
              </button>
              <button
                onClick={() => setSideBarType("dark")}
                className={cn(
                  "flex-grow border border-blue-1 rounded-md py-2 px-2 text-white dark:text-blue-1 bg-transparent cursor-pointer hover:translate-y-[-2%] transition-transform hover:shadow-input_shadown hover:shadow-cyan-500/50",
                  sideBarType === "dark"
                    ? "bg-gradient-to-r from-[#11c4ef] to-[#1187ef]"
                    : ""
                )}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="flex flex-col py-5">
            <div className="py-4 flex items-center justify-between">
              <h4 className="text-light-text dark:text-dark-text text-[18px] font-medium">
                Light/Dark
              </h4>
              <Switch />
            </div>
            <div className="separate_line"></div>

            <div className="py-4 flex items-center justify-between">
              <h4 className="text-light-text dark:text-dark-text text-[18px] font-medium">
                Sidenav Mini
              </h4>
              <Switch />
            </div>
            <div className="separate_line"></div>

            <div className="py-4 flex items-center justify-between">
              <h4 className="text-light-text dark:text-dark-text text-[18px] font-medium">
                Navbar Fixed
              </h4>
              <Switch />
            </div>
          </div>

          <div className="py-3">
            <div className="w-full flex flex-col items-center justify-center px-5">
              <h2 className="dark:text-dark-text text-[36px] font-medium font-serif">
                Visit Us
              </h2>
              <div className="flex items-start py-2">
                <MapPin className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                  Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội
                </p>
              </div>

              <div className="flex items-start py-2">
                <Home className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                  Open 9:30 am - 11h30 pm
                </p>
              </div>

              <div className="flex items-start py-2">
                <Mail className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                  thanhKT285@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center px-5">
            <h2 className="dark:text-dark-text text-[20px] font-medium font-serif">
              More Detail
            </h2>
            <div className="w-full px-4 py-2 flex items-center gap-3">
              <button className="text-white flex-grow flex items-center justify-between px-2 py-3 bg-[#344767] border-none cursor-pointer hover:translate-y-[-2%] transition-transform rounded-md">
                <Instagram />
                <p className="font-serif font-medium">Instagram</p>
              </button>
              <button className="text-white flex-grow flex items-center justify-between px-2 py-3 bg-[#344767] border-none cursor-pointer hover:translate-y-[-2%] transition-transform rounded-md">
                <Facebook />
                <p className="font-serif font-medium">Facebook</p>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
