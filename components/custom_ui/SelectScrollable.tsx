import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProvinceType } from "@/types/type"
type Props = {
    onChange: (value: string) => void
    address: ProvinceType[]
    placehoder: string
    defaultVlaue: string
  }
const SelectScrollable: React.FC<Props> =({onChange, address, placehoder, defaultVlaue})=> {


  return (
    <Select
    onValueChange={value=> onChange(value)}
    >
      <SelectTrigger className="w-[280px]"> 
        <SelectValue placeholder={placehoder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placehoder}</SelectLabel>
          {
            address.map((item, index)=> (
              <SelectItem key={index} value={item.province_id}>{item.province_name}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default SelectScrollable