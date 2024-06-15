"use client"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "../ui/button"
import Image from "next/image"
import { Plus, Trash } from "lucide-react"
interface Props {
  value: string[]
  onChange: (value: string) => void
}
export default function ImageUpload(props: Props) {
  const { value, onChange } = props
  return (
    <CldUploadWidget
      uploadPreset="Restaurant_manegement"
      onSuccess={(result, { widget }) => {
        if (typeof result.info === "string" || !result.info) return
        onChange(result.info.secure_url)
        widget.close()
      }}
    >
      {({ open }) => {
        return ( 
          <>
            <div className="flex flex-wrap gap-5">
              {value.map((url, index) => (
                <div key={index} className="relative w-[150px] h-[150px] rounded-lg overflow-hidden ">
                    <div className="px-2 py-2 absolute bg-red-500 rounded-lg top-0 right-0 z-10 cursor-pointer">

                     <Trash width={15}height={15} />
                    </div>
                    <Image width={150} height={150} src={url} alt="upload" className="object-cover"/>
                </div>
              ))}
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault(),
                open()
              }}
              className="flex items-center gap-1 font-medium text-[16px]"
            >
           <span><Plus /></span>   Upload an Image
            </Button>
          </>
        )
      }}
    </CldUploadWidget>
  )
}
