"use client"
import { CategoryType } from "@/app/(admin)/dashboard/inventories/categories/page"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

type Props = {
    onChange: (value: string) => void
    categories: CategoryType[] | null
    placehoder: string
    values: string
}

export default function OneSelect({
    onChange,
    categories,
    placehoder,
    values
}:Props) {
  return (
    <Select
     onValueChange={(value) => {
       onChange(value)
      }}
    >
    <SelectTrigger className="w-full bg-light-bg_2 dark:bg-dark-bg_2 focus:ring-1">
      <SelectValue placeholder={placehoder} />
    </SelectTrigger>

    <SelectContent className="w-full bg-light-bg_2 dark:bg-dark-bg_2">
      {
        categories?.map(category=>(
            <SelectItem key={category._id} value={category._id}>{category.title}</SelectItem>
        ))
      }
    </SelectContent>
  </Select>
  )
}
