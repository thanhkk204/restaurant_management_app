"use client"
import { useMemo, useState } from "react"
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Plus, Trash } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LocationType, TableType } from "../../reservations/page"
type Props = {
  table: {
    _id: string,
    title: string
  }
 
}
export default function Item(Props: Props) {
  const { table} = Props

  const {
    setNodeRef,
    transform,
    transition,
    listeners,
    attributes,
    isDragging,
  } = useSortable({
    id: table._id,
    data: {
      type: "table",
      table: table,
    },
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }



  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative rounded-md"
    >
      <div className="w-full h-[150px] bg-blue-1">
        {<p className="text-white">{table.title}</p>}
      </div>
    </div>
  )
}
