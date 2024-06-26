"use client"
import React, { useEffect, useMemo, useState } from "react"
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
import { Plus } from "lucide-react"
import { createPortal } from "react-dom"
import Item from "./_dnd-kit/Table"
import { toast } from "@/components/ui/use-toast"
import Location from "./_dnd-kit/Location"

export type TableType = {
  _id: string
  location_id: string
  name: string,
  number_of_seats: number,
  order: number,
  status: string

}

export type LocationType = {
  _id: string
  locationInRestaurant: string
  order: number
  facility_id: string
}
export default function DnDPage() {
  const [activedLocation, setActivedLocation] = useState<LocationType | null>(null)
  const [activeTable, setActiveTable] = useState<TableType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [locations, setLocations] = useState<LocationType[] | null>(null)
  const [numberOfLocation, setNumberOfLocation] = useState<number>()
  const [locationsTrigger, setLocationsTrigger] = useState<boolean>(false)
  const [tables, setTables] = useState<TableType[] | null>(null)
  const [numberOfTable, setNumberOfTable] = useState<number>()
  const [tableTrigger, setTableTrigger] = useState<boolean>(false)
  // Fetch all locations
  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/locations", {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any locations data!",
          })
        }
        const data = await res.json()
        setLocations(data.locations)
        setNumberOfLocation(data.numberOfLocation)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all Locations!",
        })
      }
    }
    fetData()
  }, [locationsTrigger])
  // Fetch all tables
  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/tables", {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any tables data!",
          })
        }
        const data = await res.json()
        setTables(data.tables)
        setNumberOfTable(data.numberOfTable)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all Tables!",
        })
      }
    }
    fetData()
  }, [tableTrigger])
// Update for location orders
  const updateForLocationOrder = (newArray: LocationType[])=>{
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/locations", {
          method: "PUT",
          body: JSON.stringify({newArray: newArray})
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't update location orders",
          })
        }
        // After updating location order trigger useState for fetching newest data
        setLocationsTrigger(!locationsTrigger)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with update Location!",
        })
      }
    }
    fetData()
  }
// Update for table orders
  const updateForTableOrder = (newArray: TableType[])=>{
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/tables", {
          method: "PUT",
          body: JSON.stringify({newArray: newArray})
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't update location orders",
          })
        }
        // After updating table order trigger useState for fetching newest data
        // setTableTrigger(!tableTrigger)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with update Location!",
        })
      }
    }
    fetData()
  }
// Delete location
const deleteLocation = (_id: string)=>{
  const fetData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/reservations/locations/"+_id, {
        method: "DELETE",
      })

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't delete this location location orders",
        })
      }
      const data = await res.json()
      toast({
        variant: "sucess",
        title: data.message,
      })
// After updating table order trigger useState for fetching newest data
      setLocationsTrigger(!locationsTrigger)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast({
        variant: "destructive",
        title: "Something wrong with delete Location!",
      })
    }
  }
  fetData()
}
// Delete table
const deleteTable = (_id: string)=>{
  const fetData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/reservations/tables/"+_id, {
        method: "DELETE",
      })

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't delete this location location orders",
        })
      }
// After updating table order trigger useState for fetching newest data
      setTableTrigger(!tableTrigger)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast({
        variant: "destructive",
        title: "Something wrong with delete Location!",
      })
    }
  }
  fetData()
}
// Update information for table
const updateTable = (
  {number_of_seats, name, table_id}:{
   number_of_seats: number,
   name: string,
   table_id: string}
  )=>{
  const fetData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/reservations/tables/"+table_id, {
        method: "PATCH",
        body: JSON.stringify({number_of_seats, name})
      })

      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: "Can't update this table",
        })
      }
// After updating table order trigger useState for fetching newest data
      setTableTrigger(!tableTrigger)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast({
        variant: "destructive",
        title: "Something wrong with delete Location!",
      })
    }
  }
  fetData()
}
  
// Get id array for sortableContext items
   const locationsIds = useMemo(
    () => locations?.map((location) => location._id),
    [locations]
  )
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
        {locations && locationsIds && tables && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-11 lg:gap-14 ">
            <SortableContext items={locationsIds} strategy={rectSortingStrategy}>
              {locations.map((location) => {
                return (
                  <Location
                    key={location._id}
                    location={location}
                    tables={tables?.filter(
                      (item) => item.location_id === location._id
                    )}
                    addNewTable={addNewTable}
                    deleteLocation={deleteLocation}
                    deleteTable={deleteTable}
                    updateTable={updateTable}
                  />
                )
              })}
            </SortableContext>
            <div
              onClick={addNewLocation}
              className="h-[350px] flex items-center justify-center border border-dashed border-light-primaryColor dark:border-dark-primaryColor opacity-45"
            >
              <button className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-dashed border-light-primaryColor dark:border-dark-primaryColor">
                <Plus />
              </button>
            </div>
          </div>
        )}
        {typeof window === "object" &&
          createPortal(
            <DragOverlay>
              {activedLocation && tables && (
                <Location
                  location={activedLocation}
                  tables={tables?.filter(
                    (item) => item.location_id === activedLocation._id
                  )}
                  addNewTable={addNewTable}
                  deleteLocation={deleteLocation}
                  deleteTable={deleteTable}
                  updateTable={updateTable}
                ></Location>
              )}
              {
              activeTable && 
              <Item 
              table={activeTable} 
              deleteTable={deleteTable}
              updateTable={updateTable}
              />
              }
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </section>
  )
  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    if (!active.id || !active.data.current) return
    if (active.data.current.type === "location")
      setActivedLocation(active.data.current.location)
    if (active.data.current.type === "table")
      setActiveTable(active.data.current.table)
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
        if(!tables) return null
        const oldIndex = tables?.findIndex((table) => table._id === active.id)
        const newIndex = tables?.findIndex((table) => table._id === over.id)
        if (tables[oldIndex].location_id !== tables[newIndex].location_id) {
          tables[oldIndex].location_id = tables[newIndex].location_id
        }
        const newTableArray = arrayMove(tables, oldIndex, newIndex)
        // After get new table array by arrayMove method, updata database based on newArray
        updateForTableOrder(newTableArray)
        return newTableArray
      })
    }
    // Sisuation 2 table over column
    if (
      active.data.current.type === "table" &&
      over.data.current.type === "location"
    ) {
      setTables((tables) => {
        if(!tables) return null
        const oldIndex = tables.findIndex((table) => table._id === active.id)
        const idLocation = over.data.current?.location._id
        tables[oldIndex].location_id = idLocation
        // After get new table array, updata database based on newArray
        updateForTableOrder(tables)
        return [...tables]
      })
    }
  } 

  function handleDragEnd(event: DragEndEvent) {
    setActivedLocation(null), setActiveTable(null)
    const { active, over } = event
    if (!active.data.current || !over) return
    if (active.id === over.id) return
    if(!locations) return
    if (active.data.current.type === "location")
      setLocations(() => {
        const oldIndex = locations?.findIndex(
          (location) => location._id === active.id
        )
        const newIndex = locations?.findIndex(
          (location) => location._id === over.id
        )
        const newArray = arrayMove(locations, oldIndex, newIndex)
        // After get new location array by arrayMove method, updata database based on newArray
        updateForLocationOrder(newArray)
        return newArray
      })
  }
  // Add new Location
  function addNewLocation() {
    const addLocation = async () => {
      try {
        const res = await fetch("/api/reservations/locations", {
          method: "POST",
          body: JSON.stringify({numberOfLocation})
        })

        if (!res.ok) {
         return toast({
            variant: "destructive",
            title: "Can't get any data!",
          })
        }
        const data = await res.json()
        setLocationsTrigger(!locationsTrigger)
        toast({
          variant: "sucess",
          title: data.message,
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something wrong with get all dishes!",
        })
      }
    }
    addLocation()
  }
  // Add new Table
  function addNewTable(location_id: string) {
    const addTable = async () => {
      try {
          const res = await fetch("/api/reservations/tables", {
          method: "POST",
          body: JSON.stringify({order: numberOfTable, location_id})
        })

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't add table",
          })
        }
        const data = await res.json()
        if(res.status === 500){
         return toast({
            variant: "destructive",
            title: data.message,
          })
        }
        setTableTrigger(!tableTrigger)
        toast({
          variant: "sucess",
          title: data.message,
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something wrong with add table!",
        })
      }
    }
    addTable()
  }
}
