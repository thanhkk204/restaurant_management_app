"use client"
import { closestCenter, DndContext, DragEndEvent, DragOverEvent, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import React, { useState } from 'react'
import Column from './_dnd-kit/Column'
// import MyBook from '@/components/MyBook'

const Locations = [
  {
    _id: '1',
    title: 'menu',
  },
  {
    _id: '2',
    title: 'sideBar',
  }
]
const Tables = [
  {
    _id: '3',
    title: 'Ban so 1',
    location_id: '1'
  },
  {
    _id: '4',
    title: 'Ban so 2',
    location_id: '1'
  }
]
export default function MenuPage() {
  const [locations, setLocations] = useState<{_id: string, title: string}[] | null>(Locations)
  const [tables, setTables] = useState<{_id: string, title: string, location_id: string}[] | null>(Tables)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )
  const locationsIds = locations?.map(item=> item._id)
  return (
      <section>
     <div className="bg-light-bg_2 dark:bg-dark-bg_2 px-3 lg:px-5 py-4 lg:py-6 rounded-md min-h-fit w-full">
      
           {/* <MyBook/> */}
    </div>
  
</section>
)
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event
  console.log({active, over})
  if (!active.data.current || !over) return
  if (active.id === over.id) return
  
}
function handleDragStart (event: DragStartEvent){

}
function handleDragOver(event: DragOverEvent) {
  const { active, over } = event
  if (!over) return
  const activeId = active.id
  const overId = over?.id

  if (activeId === overId) return
  if (!active.data.current || !over?.data.current) return
  // Sisuation 1 table over table
  if (
    active.data.current.type === "table" &&
    over.data.current.type === "table"
  ) {
    setTables((tables) => {
      if (!tables) return null
      const oldIndex = tables?.findIndex((table) => table._id === active.id)
      const newIndex = tables?.findIndex((table) => table._id === over.id)

      // if 
      if (tables[oldIndex].location_id !== tables[newIndex].location_id) {
        tables[oldIndex].location_id = tables[newIndex].location_id
      }
      const newTableArray = arrayMove(tables, oldIndex, newIndex)
      return newTableArray
    })
  }
  // Sisuation 2 table over column
  if (
    active.data.current.type === "table" &&
    over.data.current.type === "location"
  ) {
    setTables((tables) => {
      if (!tables) return null
      const oldIndex = tables.findIndex((table) => table._id === active.id)
      const idLocation = over.data.current?.location._id
      tables[oldIndex].location_id = idLocation
      return [...tables]
    })
  }
}

}