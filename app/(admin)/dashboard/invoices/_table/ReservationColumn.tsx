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
  reservations: ReservationType[]
}
export const ReservationColumn = ({
  reservations
 }: columProp) => {
 
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
      size: 100, //starting column size
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
      cell: ({row})=>{
        const status = row.original.status
        let stt: string;
        let colorText: string;
        status === "RESERVED" ? (stt = 'Đặt trước', colorText= ''):
         status === "SEATED" ? (stt = 'Đang phục vụ', colorText= '#ff9800'):
         status === "COMPLETED" ? (stt = 'Đã hoàn thành', colorText= '#fb6340'):
         (stt = 'Đã hủy', colorText= '#f5365c')
         
        return <h4 style={{color: colorText, fontSize: '18px'}}>{stt}</h4>
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
      size: 150, //starting column size
    },
  ]
  return columns
}
