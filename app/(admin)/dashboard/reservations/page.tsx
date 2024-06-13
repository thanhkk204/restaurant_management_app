"use client"
import React, { useMemo, useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable"
import Column from "./_dnd-kit/Column"
import { Plus } from "lucide-react"
import { createPortal } from "react-dom"
import Item from "./_dnd-kit/Item"

export type TableType = {
  id: string,
  location_id: string,
  name: string
}
export type ColumnType = {
  id: string,
  name: string
}
export default function DnDPage() {
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null)
  const [activeTable, setActiveTable] = useState<TableType | null>(null)
  const [locations, setLocations] = useState<ColumnType[]>([
    {
      id: '101',
      name: "Tầng 1",
    },
    {
      id: '102',
      name: "Tầng 2",
    },
    {
      id: '103',
      name: "Tầng 3",
    },
  ])
  const locationsId = useMemo(()=> locations.map(location=> location.id), [locations])
  console.log(locations)
  const [tables, setTables ] = useState<TableType[]>([
    {
      id: '1',
      location_id: '102',
      name: "Bàn số 3"
    },
    {
      id: '2',
      location_id: '102',
      name: "Bàn số 5"
    },
    {
      id: '3',
      location_id: '103',
      name: "Bàn số 10"
    },
    {
      id: '4',
      location_id: '103',
      name: "Bàn số 9"
    },
    {
      id: '5',
      location_id: '101',
      name: "Bàn số 7"
    },
    {
      id: '10',
      location_id: '101',
      name: "Bàn số 75"
    },
  ])
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <section className="bg-light-bg_2 dark:bg-dark-bg_2 px-3 lg:px-5 py-4 lg:py-6 rounded-md min-h-fit w-full">
      <DndContext
        sensors={sensors}
        // collisionDetection={closestCenter}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {locations && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SortableContext items={locationsId} strategy={rectSortingStrategy}>
              {locations.map(location => {
               return <Column 
               key={location.id} 
               column={location}
               tables={ tables.filter(item=> item.location_id === location.id)}
               addNewTable={addNewTable}
               />
              }
              )}
            </SortableContext>
            <div 
            onClick={addNewColumn}
            className="h-[350px] flex items-center justify-center border border-dashed border-light-primaryColor dark:border-dark-primaryColor opacity-45"
            >
              <button className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-dashed border-light-primaryColor dark:border-dark-primaryColor">
                <Plus />
              </button>
            </div>
          </div>
        )}
        {
          typeof window === "object" && createPortal(
            <DragOverlay>
                {
                  activeColumn && (
                    <Column
                    column={activeColumn}
                    tables={ tables.filter(item=> item.location_id === activeColumn.id)}
                    addNewTable={addNewTable}
                    >
                    </Column>
                  )
                }
                {
                  activeTable && (
                    <Item
                    table={activeTable}
                    >
                    </Item>
                  )
                }
            </DragOverlay>,
           document.body,
          )
        }
       
      </DndContext>
    </section>
  )
  function handleDragStart(event: DragStartEvent){
    const {active} = event

    if(!active.id || ! active.data.current) return
    if(active.data.current.type === 'column') setActiveColumn(active.data.current.column)
    if(active.data.current.type === 'table') setActiveTable(active.data.current.table)
    
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveColumn(null),
    setActiveTable(null)
    const { active, over } = event
    if (!active.data.current || !over) return
    if(active.id === over.id) return
    if(active.data.current.type === 'column')
      setLocations(pre=> {
        const oldIndex = locations.findIndex((location) => location.id === active.id)
        const newIndex = locations.findIndex((location) => location.id === over.id)
        return arrayMove(locations, oldIndex, newIndex)
      })
  }
  
  function handleDragOver(event: DragOverEvent){
      const {active, over} = event
      if(!over) return

      const activeId = active.id;
      const overId = over?.id;
  
      if (activeId === overId) return;

      if (!active.data.current || !over?.data.current) return
    // Sisuation 1 table over table
    if(active.data.current.type === 'table' &&  over.data.current.type === 'table'){
      setTables(tables=> {
        const oldIndex = tables.findIndex((table) => table.id === active.id)
        const newIndex = tables.findIndex((table) => table.id === over.id)
        if (tables[oldIndex].location_id !== tables[newIndex].location_id) {
          tables[oldIndex].location_id = tables[newIndex].location_id
        }
        return arrayMove(tables, oldIndex, newIndex)
      })
    }
    // Sisuation 2 table over column
    if(active.data.current.type === 'table' &&  over.data.current.type === 'column'){
      setTables(tables=> {
        const oldIndex = tables.findIndex((table) => table.id === active.id)
        const idColum = over.data.current?.column.id
        tables[oldIndex].location_id = idColum
        return [...tables]
      })
    }
  }
  function addNewColumn(){
    setLocations(pre=> [...pre, {id: String(crypto.randomUUID()), name: "Default Name"}])
  }
  function addNewTable(location_id: string){
    setTables(pre => [...pre, {id: String(crypto.randomUUID()), location_id: location_id, name: 'Default Table'}])
  }
}
