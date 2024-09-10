import CollectionForm from "@/components/custom_ui/CollectionForm";

export default function AddNewCollection() {

  return (
    <div className="min-h-screen md:min-h-fit px-3 md:px-5 py-4 md:py-6">
      <div className="w-full lg:max-w-[50%]">
        <CollectionForm />
      </div>
    </div>
  )
}
