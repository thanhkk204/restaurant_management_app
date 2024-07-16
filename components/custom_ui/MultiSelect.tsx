"use client"
import { CollectionType } from "@/app/(admin)/dashboard/inventories/collections/page"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useState } from "react"
import { Badge } from "../ui/badge"
type Props = {
  onChange: (value: string) => void
  onRemove: (value: string) => void
  collections: CollectionType[] | null
  placehoder: string
  values: string[]
}
export default function MultiSelect({
  onChange,
  onRemove,
  values,
  placehoder,
  collections,
}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState('')
  
  // Filter selected item which is in collections
  let selectedCollection: CollectionType[] = []
  selectedCollection = collections?.filter(collection => values.includes(collection._id)) as CollectionType[]
  // Sort by index of where item is in values array
  if (selectedCollection) {
    selectedCollection.sort((a,b)=> values.indexOf(a._id) - values.indexOf(b._id))
  }
  
  const unSelectedCollection = collections?.filter(collection => !values.includes(collection._id))
  
  return (
    <Command className="bg-light-bg_2 dark:bg-dark-bg_2 overflow-visible w-full h-fit">
        <div className="flex flex-wrap gap-3">
        {
            selectedCollection &&  selectedCollection.map(collection=>(
                <Badge key={collection._id} variant="secondary" className="my-2 mx-1">
                    {collection.title}
                    <span 
                    onClick={()=>onRemove(collection._id)}
                    className="ml-3 font-thin hover: cursor-pointer hover:text-red-500"
                    >X</span>
                </Badge>
            ))
        }
        </div>
      <CommandInput
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        placeholder={placehoder}
      />
      <CommandList className="relative overflow-visible">
         {open && (
          <CommandGroup className="absolute w-full top-0 left-0 z-10 mt-2 bg-light-bg dark:bg-dark-bg rounded-lg">
            {
                unSelectedCollection?.map(collection=>(
                    <CommandItem
                    key={collection._id}
                    value={collection.title}
                    onMouseDown={e=> e.preventDefault()}
                    onSelect={() => onChange(collection._id)}
                    className="hover:scale-95 transition-all ease-in rounded-md cursor-pointer"
                  >
                    {collection.title}
                  </CommandItem>
                ))
            }
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}
