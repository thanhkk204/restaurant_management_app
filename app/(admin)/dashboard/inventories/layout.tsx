import Sidebar2 from "@/components/layouts/admin/Sidebar2"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full flex py-2 md:py-5 px-5 gap-0 md:gap-10">
      <Sidebar2/>
      {children}
    </section>
  )
}
