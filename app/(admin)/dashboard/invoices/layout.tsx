import SubNavigate from "@/components/layouts/admin/SubNavigate"
import { Book, CookingPot, LibraryBig } from "lucide-react"

const NavigateLink = [
  {
    link: '/dashboard/inventories',
    icons: <CookingPot width={20} />,
    title: "Dishes"
  },
  {
    link: '/dashboard/inventories/collections',
    icons: <LibraryBig width={20}/>,
    title: "Collections"
  },
  {
    link: '/dashboard/inventories/categories',
    icons: <Book width={20} />,
    title: "Categories"
  },
]
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full flex flex-col py-2 lg:py-5 px-2 lg:px-5 md:gap-5  bg-light-bg_2 dark:bg-transparent rounded-lg">
      {/* <SubNavigate NavigateLink={NavigateLink}/> */}
      {children}
    </section>
  )
}
