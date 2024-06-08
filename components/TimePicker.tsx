"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export function TimePicker() {
  const [selectedOption, setSelectedOption] = useState("apple")
  return (
    <Select
      defaultValue="hst"
      value={selectedOption}
      onValueChange={(value) => {
        setSelectedOption(value)
      }}
    >
      <SelectTrigger className="w-[280px] bg-light-bg_2 dark:bg-dark-bg_2">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent className="dark:bg-dark-bg">
        <SelectGroup>
          <SelectLabel>
          So Far Months
          </SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
