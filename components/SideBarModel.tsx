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
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"
import { Settings } from "lucide-react"
import { Button } from "./ui/button"

const { purple, green, orange, red, gray, blue } = colorsVariables

const colors = [purple, green, blue, orange, red, gray]

export default function SideBarModel() {
  const value = useDashBoardContext()
  if (!value) return
  const { setSideBarColor } = value

  return (
    <Sheet>
      <SheetTrigger>
        <Settings width={20} height={20} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="border-none ">
        <div className="bg-dark-bg_2 w-full h-screen p-6">

          <div className="pb-4 border-b border-dark-secondaryColor">
            <h2>Argon Configurator</h2>
            <p>See our dashboard options.</p>
          </div>

          <div className="py-5">
            <h4 className="text-light-text dark:text-dark-text py-2">
              Sidenav Colors
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
              <h4>Sidenav Type</h4>
              <p className="text-[14px] text-light-textSoft dark:text-dark-textSoft">
                Choose between 2 different sidenav types.
              </p>
            </div>
            <div className=" w-full flex items-center px-4 py-2 gap-3 font-medium ">
              <button
                className="flex-grow border border-blue-1 rounded-md py-2 px-2 text-white dark:text-blue-1 bg-transparent cursor-pointer 
            hover:translate-y-[-2%] transition-transform hover:shadow-input_shadown hover:shadow-cyan-500/50"
              >
                White
              </button>
              <Button className="flex-grow bg-gradient-to-br from-[#11c4ef] to-[#1187ef]">Dark</Button>
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}
