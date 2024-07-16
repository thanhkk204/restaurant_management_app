"use client"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"
import Link from "next/link"
import { usePathname } from "next/navigation"

type LinkProp = {
  link: string
  icons: JSX.Element
  title: string
}
type Props = {
  NavigateLink: LinkProp[]
}
export default function SubNavigate({ NavigateLink }: Props) {
  const path = usePathname()
  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor } = value
  return (
    <div className="fixed z-50 bottom-0 left-0 md:relative w-full ">
      <div className="bg-light-bg dark:bg-dark-bg md:bg-light-bg_2 md:dark:bg-dark-bg_2 flex items-center md:rounded-md gap-3 min-w-[250px] px-4 py-2 overflow-x-auto no-scrollbar">
        {NavigateLink.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            style={
              path === item.link && !sideBarColor
                ? { backgroundColor: "#051139", color: "white" }
                : path === item.link && sideBarColor
                ? { backgroundColor: sideBarColor, color: "white" }
                : { backgroundColor: "", color: "" }
            }
            className="max-w-fit py-2 px-3 text-light-textSoft dark:text-dark-textSoft rounded-lg
          cursor-pointer  flex items-center justify-start gap-2 "
          >
            {item.icons}
            <p className="text-[18px]">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
