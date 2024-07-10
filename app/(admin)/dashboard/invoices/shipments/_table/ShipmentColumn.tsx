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
import {ShipmentType } from "@/lib/constants/type"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type columProp = {
  shipments: ShipmentType[]
  handleCreateGHN_Order: (shipment_id: string) =>void
}
export const ShipmentColumn = ({
  shipments,
  handleCreateGHN_Order
 }: columProp) => {
 
  // Columns to be returned
  const columns: ColumnDef<ShipmentType>[] = [
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
      accessorKey: "order_code",
      header: "Mã đơn",
      size: 100, //starting column size
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
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
      size: 100, //starting column size
    },
    {
      accessorKey: "service_id",
      header: "Gói giao hàng",
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
      accessorKey: "isPaidOnline",
      header: "Thanh toán online",
      size: 100, //starting column size
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({row})=>{
        const status = row.original.status
        let stt: string;
        let colorText: string;
        status === "RESERVED" ? (stt = 'Đặt trước', colorText= ''):
         status === "COMPLETED" ? (stt = 'Đã hoàn thành', colorText= '#fb6340'):
         (stt = 'Đã hủy', colorText= '#f5365c')
         
        return <h4 style={{color: colorText, fontSize: '18px'}}>{stt}</h4>
      },
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
            <Button>Xác nhận đơn</Button>
          </DialogTrigger>
          <DialogContent className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text">
            <DialogHeader>
              <DialogTitle>Xác nhận tạo đơn hàng</DialogTitle>
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
                onClick={() => handleCreateGHN_Order(row.original._id)}
                className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Tạo 
              </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
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
