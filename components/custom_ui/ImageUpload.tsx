"use client"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "../ui/button"
import Image from "next/image"
import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
interface Props {
  values: string[]
  onChange: (url: string) => void
  onRemove: (url: string) => void
}
export default function ImageUpload(props: Props) {
  const {values, onChange, onRemove } = props
  return (
    <CldUploadWidget
      uploadPreset="Restaurant_manegement"
      onUpload={
        (result, { widget }) => {
          if (typeof result.info === "string" || !result.info) return
             const url = result.info.secure_url as string 
            onChange(url)
        }
      }
    >
      {({ open }) => {
        return ( 
          <>
            <div className="flex flex-wrap gap-5">
              {values.map((url, index) => (
                <div key={index} className="relative w-[150px] h-[150px] rounded-lg overflow-hidden ">
                    <div 
                    onClick={()=>onRemove(url)}
                    className="px-2 py-2 absolute bg-red-500 rounded-lg top-0 right-0 z-10 cursor-pointer"
                    >
                     <Trash width={15}height={15} />
                    </div>
                    <Image width={150} height={150} src={url} alt="upload" className="object-cover"/>
                </div>
              ))}
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault()
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
