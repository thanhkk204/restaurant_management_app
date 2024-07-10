"use client"

import { Table } from "@tanstack/react-table"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Button } from "../ui/button"
import { DataTableViewOptions } from "./DataTableViewOptions"
import { Input } from "../ui/input"
import { RotateCcw } from "lucide-react"

// import { Button } from "@/registry/new-york/ui/button"
// import { Input } from "@/registry/new-york/ui/input"

// import { priorities, statuses } from "../data/data"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}
export const statuses = [
  {
    value: "RESERVED",
    label: "RESERVED",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "SEATED",
    label: "SEATED",
    // icon: CircleIcon,
  },
  {
    value: "COMPLETED",
    label: "COMPLETED",
    // icon: StopwatchIcon,
  },
  {
    value: "CANCELED",
    label: "CANCELED",
    // icon: CheckCircledIcon,
  },
]
export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className="flex items-center max-w-fit">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter userName..."
          value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("userName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] px-3 py-5 bg-light-bg_2 dark:bg-dark-bg_2"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
       
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RotateCcw className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}