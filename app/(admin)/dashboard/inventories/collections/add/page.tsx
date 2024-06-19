"use client"
import CollectionForm from "@/components/custom_ui/collections/CollectionForm"

export default function AddNewCollection() {
  
  return (
    <section className="min-h-screen md:min-h-fit px-3 md:px-5 py-4 md:py-6">
      <div className="w-full lg:max-w-[50%]">
        <CollectionForm/>
      </div>
    </section>
  )
}
