"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { CollectionType } from "../page"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type columProp = {
  handleDeleteCollection: (idsArray: string[]) => void
}

export const CollectionColumn = ({ handleDeleteCollection }: columProp) => {
  const handleDelete = (id: string) => {
    // Convert specific id to array id to reusable handleDeleteCollection at parent component
    const IdsArray = [id]
    handleDeleteCollection(IdsArray)
  }
  // Columns to be returned
  const columns: ColumnDef<CollectionType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 100, //starting column size
    },
    {
      accessorKey: "title",
      header: "Title",
      size: 200, //starting column size
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        return (
          <Image src={row.original.image} width={50} height={50} alt="image" />
        )
      },
      size: 200, //starting column size
    },
    {
      accessorKey: "desc",
      header: "Desc",
      size: 400, //starting column size
    },
    {
      accessorKey: "isShow",
      header: "IsShow",
      size: 200, //starting column size
    },
    {
      id: "features",
      header: ({ table }) => <div></div>,
      cell: ({ row }) => (
        <div
          onClick={() => handleDelete(row.original._id)}
          className="w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer text-white bg-red-500 hover:scale-90 transition-all ease-in"
        >
          <Trash width={20} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 400, //starting column size  size: 200, //starting column size
    },
  ]
  return columns
}
