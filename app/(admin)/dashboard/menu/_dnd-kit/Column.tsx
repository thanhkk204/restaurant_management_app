"use client"
import { useMemo, useState } from "react"
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Item from "./Item"
type Props = {
  tables?: {
    _id: string,
    title: string
  }[]
  location: {
    _id: string,
    title: string
  }
 
}
export default function Column(Props: Props) {
  const { location, tables} = Props
  const tablesId = useMemo(() => tables?.map((table) => table._id), [tables])

  const {
    setNodeRef,
    transform,
    transition,
    listeners,
    attributes,
    isDragging,
  } = useSortable({
    id: location._id,
    data: {
      type: "location",
      location: location,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }


  // Overlay for drag
  if (isDragging) {
    return (
      <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative rounded-md opacity-55 pointer-events-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max gap-6 md:gap-10 rounded-md bg-light-bg dark:bg-dark-bg overflow-auto px-8 py-6 h-[550px] text-light-text dark:text-dark-text">
        {
          tablesId && (<SortableContext items={tablesId} strategy={rectSortingStrategy}>
            {tables?.map((table) => (
              <Item 
              key={table._id} 
              table={table} 
              />
            ))}
          </SortableContext>)
        }
      </div>
    </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      // {...listeners}
      className="relative rounded-md"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 auto-rows-max gap-6 md:gap-10 rounded-md bg-light-bg dark:bg-dark-bg overflow-auto px-8 py-6 h-[550px] text-light-text dark:text-dark-text">
     
        {
          tablesId && (<SortableContext items={tablesId} strategy={rectSortingStrategy}>
            {tables?.map((table) => (
              <Item 
              key={table._id} 
              table={table} 
              />
            ))}
  
          </SortableContext>)
        }
      </div>
    </div>
  )
}
