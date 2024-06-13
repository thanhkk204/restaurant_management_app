import SubNavigate from "@/components/layouts/admin/SubNavigate"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full flex flex-col md:py-5 lg:px-5 gap-5 md:gap-10 ">
      <SubNavigate/>
      {children}
    </section>
  )
}
