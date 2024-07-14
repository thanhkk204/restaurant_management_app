"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { CartItem, OrderedFoodType } from "@/lib/constants/type"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
    orderedFoods: CartItem[]
}
export default function CartTable({orderedFoods}: Props) {
   const [isClientSide, setIsClientSide] = useState<boolean>(false)

   useEffect(()=>{
     setIsClientSide(true)
   },[])
    const totalPrice = orderedFoods.reduce((sum, item) => {
        return sum + item.quantity * item.price
      }, 0)
  return (
    <>
    {
      isClientSide && (
        <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Tên</TableHead>
                  <TableHead className="min-w-[100px]">Ảnh</TableHead>
                  <TableHead className="max-w-[100px] text-center">
                    Số lượng
                  </TableHead>
                  <TableHead className="text-right min-w-[135px]">
                    Thành tiền
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                { orderedFoods.map((orderedFood) => (
                    <TableRow key={orderedFood.dish_id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col leading-7 truncate">
                          <h2>{orderedFood.title}</h2>
                          <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                            {formatCurrency(orderedFood.price)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Image
                          width={50}
                          height={50}
                          alt="dishImage"
                          src={orderedFood?.image}
                        />
                      </TableCell>
                      <TableCell>
                        <p className="text-center">{orderedFood.quantity}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(
                          orderedFood.quantity * orderedFood.price
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-light-bg_2 dark:bg-dark-bg_2 ">
                  <TableCell colSpan={2} className="text-[20px] font-medium">
                    Tổng
                  </TableCell>
                  <TableCell colSpan={2} className="text-right">
                    {formatCurrency(totalPrice)}
                  </TableCell>
                </TableRow>
              </TableFooter>
    </Table>
      )
    }
    </>
  )
}
