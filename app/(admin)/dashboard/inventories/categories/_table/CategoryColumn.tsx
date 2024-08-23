"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { CategoryType } from "../page"
import Prompt from "@/components/custom_ui/Prompt"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type columProp = {
  handleDeleteCategory: (idsArray: string[]) => void
  handleUpdateCategory: (id: string) => void
}

export const CategoryColumn = ({ 
  handleDeleteCategory,
  handleUpdateCategory
 }: columProp) => {
  const handleDelete = (id: string) => {
    // Convert specific id to array id to reusable handleDeleteCategory at parent component
    const IdsArray = [id]
    handleDeleteCategory(IdsArray)
  }
  // Columns to be returned
  const columns: ColumnDef<CategoryType>[] = [
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
      size: 50, //starting column size
      minSize: 50,
    },
    {
      accessorKey: "title",
      header: "Title",
      size: 300, //starting column size
      minSize: 200,
      maxSize:400,
      enableResizing: true
    },
    {
      accessorKey: "desc",
      header: "Desc",
      size: 400, //starting column size
      minSize: 300,
      maxSize:600
    },
    {
      accessorKey: "isShow",
      header: "IsShow",
      size: 200, //starting column size
      minSize: 50,
    },
    {
      id: "features",
      header: ({ table }) => <div></div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-5">
        <Prompt
        trigger={
          <div
            className="px-3 py-3 rounded-full cursor-pointer text-white bg-light-error dark:bg-dark-error hover:scale-90 transition-all ease-in"
          >
            <Trash />
          </div>
          }
        title="Bạn chắc muốn xóa không"
        prompt="Xóa"
        propmptEvent={() => handleDelete(row.original._id)}
        />
        <Button
        onClick={()=> handleUpdateCategory(row.original._id)}
        >
        Sửa
        </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 100, //starting column size  size: 200, //starting column size
      minSize: 50,
    },
  ]
  return columns
}
