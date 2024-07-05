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
import { Badge } from "@/components/ui/badge"
import { ReservationType } from "@/lib/constants/type"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type columProp = {
  handleDeleteDishes: (idsArray: string[]) => void
  handleUpdateDish: (id: string) => void
  reservations: ReservationType[]
}
export const ReservationColumn = ({ 
  handleDeleteDishes,
  handleUpdateDish,
  reservations
 }: columProp) => {
  const handleDelete = (id: string) => {
    // Convert specific id to array id to reusable handleDeleteDishes at parent component
    const IdsArray = [id]
    handleDeleteDishes(IdsArray)
  }
  // Columns to be returned
  const columns: ColumnDef<ReservationType>[] = [
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
      accessorKey: "userName",
      header: "Tên khách",
      size: 200, //starting column size
      minSize: 200,
      maxSize:400,
      enableResizing: true
    },
    {
      accessorKey: "table_id",
      header: "Bàn số",
      size: 200, //starting column size
      minSize: 200,
      enableResizing: true,
      cell: ({ row }) => {
        const table = row.original.table_id.name
        return (
          <div className="flex flex-wrap gap-1">
           {table}
          </div>
        )
      },
    },
    {
      accessorKey: "party_size",
      header: "Số người",
      size: 200, //starting column size
    },
    {
      accessorKey: "payment_method",
      header: "Phương thức TT",
      size: 200, //starting column size
      minSize: 200,
      maxSize:600,
      cell: ({row})=>{
        const payment_method = row.original.payment_method
        if(payment_method === 'CASHPAYMENT' ){
          return <div>Tiền mặt</div>
        }else if(payment_method === 'BANKPAYMENT'){
          return <div>Chuyển khoản</div>
        }
      }
    },
    {
      accessorKey: "prepay",
      header: "Trả trước",
      size: 150, //starting column size
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
      size: 150, //starting column size
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
