"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { CollectionType } from "../page"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type columProp = {
  handleDeleteCollection: (idsArray: string[]) => void
  handleUpdateCollection: (id: string) => void
}

export const CollectionColumn = ({ 
  handleDeleteCollection,
  handleUpdateCollection
 }: columProp) => {
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
        <Dialog>
          <DialogTrigger>
            <div
              className="px-3 py-3 rounded-full cursor-pointer text-white bg-light-error dark:bg-dark-error hover:scale-90 transition-all ease-in"
            >
              <Trash />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text">
            <DialogHeader>
              <DialogTitle>Bạnc có chắc muốn xóa không?</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-end py-2 gap-5">
              <DialogClose asChild>
                <Button
                  className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                text-white dark:text-white hover:scale-90 transition-all ease-in"
                >
                  Đóng
                </Button>
              </DialogClose>
              <DialogClose>
              <Button
                onClick={() => handleDelete(row.original._id)}
                className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Xóa
              </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        <Button
        onClick={()=> handleUpdateCollection(row.original._id)}
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
