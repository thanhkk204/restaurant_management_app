"use client"
import { CategoryType } from "@/app/(admin)/dashboard/inventories/categories/page"
import { DishType } from "@/app/(admin)/dashboard/inventories/page"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { formatCurrency } from "@/lib/utils"
import { OrderedFoodType } from "@/lib/constants/type"
type Props = {
  dishes: DishType[] | null
  categories: CategoryType[] | null
  orderedFoods: OrderedFoodType[]
  setOrderedFoods?: Dispatch<SetStateAction<OrderedFoodType[]>>
  deleteOrderedFood: (orderedFood_id: string) => any
  updateOrderedFood: (
    orderedFood_id: string,
    quantitiy: number
  ) => Promise<OrderedFoodType | null>
}
const Calculator: React.FC<Props> = ({
  orderedFoods,
  setOrderedFoods,
  deleteOrderedFood,
  updateOrderedFood,
}) => {
  // delete orderedFood
  const handleDeleteOrderedFood = async (e: any, orderedFood_id: string) => {
    e.preventDefault()
    const { res, data } = await deleteOrderedFood(orderedFood_id)
    if (
      res.status === 201 &&
      data.message === "Successfully" &&
      setOrderedFoods
    )
      setOrderedFoods((pre) => [
        ...pre.filter((orderedFood) => orderedFood._id !== orderedFood_id),
      ])
  }
  // Update orderedFood
  const handleMinus = async (orderedFood_id: string, quantity: number) => {
    if (quantity < 2) return
    const orderedFood = (await updateOrderedFood(
      orderedFood_id,
      quantity - 1
    )) as OrderedFoodType
    if (!setOrderedFoods) return
    setOrderedFoods((prevOrderedFoods) =>
      prevOrderedFoods.map((item) =>
        item._id === orderedFood_id ? { ...item, quantity: quantity - 1 } : item
      )
    )
  }
  const handlePlus = async (orderedFood_id: string, quantity: number) => {
    const orderedFood = (await updateOrderedFood(
      orderedFood_id,
      quantity + 1
    )) as OrderedFoodType | null
    if (!setOrderedFoods) return
    setOrderedFoods((prevOrderedFoods) =>
      prevOrderedFoods.map((item) =>
        item._id === orderedFood_id ? { ...item, quantity: quantity + 1 } : item
      )
    )
  }
 const totalPrice = orderedFoods.reduce((sum, item) => {
    return sum + item.quantity * item.dish_id.price
  }, 0)
  return (
    <div className="px-3 py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Tên</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead className="text-right min-w-[135px]">
              Thành tiền
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedFoods.map((orderedFood) => (
            <TableRow key={orderedFood._id}>
              <TableCell className="font-medium">
                <div className="flex flex-col leading-7 truncate">
                  <h2>{orderedFood.dish_id.title}</h2>
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    {formatCurrency(orderedFood.dish_id.price)}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleMinus(orderedFood._id, orderedFood.quantity)
                    }
                    className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadown"
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span>{orderedFood.quantity}</span>
                  <button
                    onClick={() =>
                      handlePlus(orderedFood._id, orderedFood.quantity)
                    }
                    className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadown"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(
                  orderedFood.quantity * orderedFood.dish_id.price
                )}
              </TableCell>
              <TableCell className="text-right">
                <button
                  onClick={(e) => handleDeleteOrderedFood(e, orderedFood._id)}
                  className="text-red-500"
                >
                  X
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Tổng</TableCell>
          <TableCell className="text-right">{formatCurrency(totalPrice)}</TableCell>
        </TableRow>
      </TableFooter>
      </Table>
    </div>
  )
}
export default Calculator
