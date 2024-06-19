"use client"
import { useMemo } from "react"
import Item from "./Item"
import { SortableContext, rectSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Plus } from "lucide-react"
import { ColumnType, TableType } from "../page"

type Props = {
  tables: TableType[]
  column: ColumnType
  addNewTable: (location_id: string)=> void
}
export default function Column(Props: Props) {
  const {column, tables, addNewTable } = Props
  const tablesId = useMemo(()=> tables.map(table=> table.id),[tables])
  const {
    setNodeRef,
     transform,
     transition,
     listeners,
     attributes,
     isDragging
    } = useSortable({
      id: column.id,
      data: {
        type: "column",
        column: column
      },
    })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if(isDragging){
    return <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
     className="grid grid-cols-3 gap-5 bg-light-bg dark:bg-dark-bg px-3 py-4 h-[350px] overflow-y-auto opacity-45"
     >

    </div>
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="grid grid-cols-3 auto-rows-max gap-5 bg-light-bg dark:bg-dark-bg px-3 py-4 h-[350px] overflow-y-auto text-light-text dark:text-dark-text"
    >
          <SortableContext items={tablesId} strategy={rectSortingStrategy}>
            {
              tables.map(item=> (
                <Item key={item.id} table={item}  />
              ))
            }

          <div 
          onClick={()=>addNewTable(column.id)}
          className="flex items-center justify-center opacity-45 "
          >
            <button className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-dashed border-light-primaryColor dark:border-dark-primaryColor">
              <Plus />
            </button>
          </div>
          </SortableContext>
    </div>
  )
}