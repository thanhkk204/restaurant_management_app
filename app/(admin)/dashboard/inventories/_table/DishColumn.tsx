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
import Image from "next/image"
import { DishType } from "../page"
import { CategoryType } from "../categories/page"
import { CollectionType } from "../collections/page"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type columProp = {
  handleDeleteDishes: (idsArray: string[]) => void
  handleUpdateDish: (id: string) => void
  categories: CategoryType[] | null
  collections: CollectionType[] | null
}
export const DishColumn = ({ 
  handleDeleteDishes,
  handleUpdateDish,
  categories,
  collections
 }: columProp) => {
  const handleDelete = (id: string) => {
    // Convert specific id to array id to reusable handleDeleteDishes at parent component
    const IdsArray = [id]
    handleDeleteDishes(IdsArray)
  }
  // Columns to be returned
  const columns: ColumnDef<DishType>[] = [
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
      size: 200, //starting column size
      minSize: 200,
      maxSize:400,
      enableResizing: true
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 200, //starting column size
      minSize: 200,
      enableResizing: true
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        return (
          <Image src={row.original.image[0]} width={50} height={50} alt="image" />
        )
      },
      size: 200, //starting column size
    },
    {
      accessorKey: "desc",
      header: "Desc",
      size: 200, //starting column size
      minSize: 200,
      maxSize:600
    },
    {
      accessorKey: "category_id",
      header: "Category",
      cell: ({ row }) => {
        const category = categories?.find(item => item._id === row.original.category_id) as CategoryType
        return (
         <div>
           {category && <Badge variant="outline">{category.title}</Badge>}
         </div>
        )
      },
      size: 150, //starting column size
    },
    {
      accessorKey: "collection_ids",
      header: "Collections",
      cell: ({ row }) => {
        const collectionList = collections?.filter(item => row.original.collection_ids.includes(item._id)) as CollectionType[]
        return (
          <div className="flex flex-wrap gap-1">
            {
             collectionList && collectionList.map(item=>(
                <Badge key={item._id} variant="outline">{item.title}</Badge>
              ))
            }
          </div>
        )
      },
      size: 200, //starting column size
    },
    {
      accessorKey: "isShow",
      header: "IsShow",
      size: 200, //starting column size
      minSize: 50,
    },
    {
      id: "features",
      header: "Features",
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
              <DialogTitle>Bạn có chắc muốn xóa không?</DialogTitle>
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
        onClick={()=> handleUpdateDish(row.original._id)}
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
