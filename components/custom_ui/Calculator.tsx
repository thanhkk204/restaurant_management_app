"use client"
import { CategoryType } from "@/app/(admin)/dashboard/inventories/categories/page"
import { DishType } from "@/app/(admin)/dashboard/inventories/page"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "../ui/button"
import { formatCurrency } from "@/lib/utils"
type Props = {
    dishes: DishType[] | null
    categories: CategoryType[] | null
    selectedDishes: DishType[] 
    setSelectedDishes?: Dispatch<SetStateAction<DishType[]>>
}
type OrderedDishType = {
    _id: string,
    dish_id: string,
    quantity: number
    isOrderedOnline: boolean
}
type selectedDishesType = {
    dish: DishType,
    quantity: number
}
const Calculator: React.FC<Props> = ({selectedDishes, setSelectedDishes})=> {
    const [orderedDishes, setOrderedDishes] = useState<selectedDishesType[]>([])
    useEffect(()=>{
        if (selectedDishes) {
            // setOrderedDishes(pre =>{
            //     const filter = pre.filter(item=> selectedDishes.includes(item.dish))
            //     return [...selectedDishes]
            // })
            setOrderedDishes(pre=>{
                const newSelectedDishes = selectedDishes.filter(dish=> !pre.find(item => item.dish._id === dish._id))
                const mutatedSelectedDishes = newSelectedDishes.map(dish=>{
                    return {
                        dish: {...dish},
                        quantity: 1
                    }}) as selectedDishesType[]
                const preDishes = pre.filter(item => !selectedDishes.includes(item.dish))
                console.log('selectedDishes', selectedDishes)
                console.log('pre', pre)
                console.log('mutatedSelectedDishes', mutatedSelectedDishes)
            return mutatedSelectedDishes ? [...preDishes, ...mutatedSelectedDishes] : [...preDishes]
            })
        }
    },[selectedDishes])
    console.log(orderedDishes);
    
    const handleMinus = (_id: string)=>{
        console.log('minus')
        setOrderedDishes(pre => {
           return [...pre.map(item=> item.dish._id === _id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item )]
        })
    }
    const handlePlus = (_id: string)=>{
        setOrderedDishes(pre => {   
            return [...pre.map(item=> item.dish._id === _id ? {...item, quantity: item.quantity + 1} : item )]
         })
    }
    
  return (
    <div className="px-3 py-4">
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[200px]">Tên</TableHead>
      <TableHead>Số lượng</TableHead>
      <TableHead className="text-right">Thành tiền</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      orderedDishes.map(item=>(
      <TableRow key={item.dish._id}>
      <TableCell className="font-medium">
        <div className="flex flex-col leading-7 truncate">
         <h2>{item.dish.title}</h2>
         <p className="text-light-textSoft dark:text-dark-textSoft font-thin">{formatCurrency(item.dish.price)}</p>
        </div>
      </TableCell>
      <TableCell>
       <div className="flex items-center gap-2">
       <span 
       onClick={()=>handleMinus(item.dish._id)}
       className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadown"
       > - </span>
       <span>{item.quantity}</span>
       <span 
       onClick={()=>handlePlus(item.dish._id)}
       className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadown"
       > + </span>
       </div>
      </TableCell>
      <TableCell className="text-right">{formatCurrency(item.quantity * item.dish.price)}</TableCell>
    </TableRow>
        ))
    }
  </TableBody>
</Table>
    </div>
  )
}
export default Calculator