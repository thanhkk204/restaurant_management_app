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
    <section className="w-full flex flex-col md:py-5 lg:px-5 gap-5 md:gap-10 ">
      <SubNavigate NavigateLink={NavigateLink}/>
      {children}
    </section>
  )
}
