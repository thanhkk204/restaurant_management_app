"use client"
import { useMemo } from "react"
import Item from "./Table"
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Plus, Trash } from "lucide-react"
import { LocationType, TableType } from "../page"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
type Props = {
  tables: TableType[]
  location: LocationType
  deleteLocation: (location_id: string) => void
  addNewTable: (table_id: string) => void
  deleteTable: (table_id: string) => void
  updateTable: ({ number_of_seats, name,table_id}:{
    number_of_seats: number,
    name: string,
    table_id: string
  }) => void
}
export default function Location(Props: Props) {
  const { location, tables, addNewTable, deleteLocation, deleteTable, updateTable} = Props
  const tablesId = useMemo(() => tables.map((table) => table._id), [tables])
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

  const handleDelete = async (_id: string) => {
    deleteLocation(_id)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="grid grid-cols-3 gap-5 bg-light-bg dark:bg-dark-bg px-3 py-4 h-[550px] overflow-y-auto opacity-45"
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative rounded-md"
    >
      <Dialog>
        <DialogTrigger className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] hover:scale-90 hover:rotate-45 transition-all duration-300 ease-in-out">
          <button className=" px-2 py-2 rounded-full bg-light-error dark:bg-dark-error border-none text-white dark:text-white">
            <Trash width={20} height={20} />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text">
          <DialogHeader>
            <DialogTitle>Bạnc có chắc muốn xóa không?</DialogTitle>
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
                onClick={() => handleDelete(location._id)}
                className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Xóa
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max gap-6 md:gap-10 rounded-md bg-light-bg dark:bg-dark-bg overflow-auto px-8 py-6 h-[550px] text-light-text dark:text-dark-text">
        <SortableContext items={tablesId} strategy={rectSortingStrategy}>
          {tables.map((table) => (
            <Item 
            key={table._id} 
            table={table} 
            deleteTable={deleteTable}
            updateTable={updateTable}
            />
          ))}

          <div
            onClick={() => addNewTable(location._id)}
            className="flex items-center justify-center opacity-45 "
          >
            <button className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-dashed border-light-primaryColor dark:border-dark-primaryColor">
              <Plus />
            </button>
          </div>
        </SortableContext>
      </div>
    </div>
  )
}
