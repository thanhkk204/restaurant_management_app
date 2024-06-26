"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"
import { DataTablePagination } from "./DataTablePagination"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Trash } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onDelete: (IdsArray: string[]) => void
  onAdd: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
  onAdd,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // // pagination
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
        // pageIndex:0
      },
    },
    // Sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // filter
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // Visibility
    onColumnVisibilityChange: setColumnVisibility,
    // Row selection
    onRowSelectionChange: setRowSelection,
  })
  const hadleDeleteSelectedRows = async (e: any): Promise<void> => {
    const rows: any = table.getFilteredSelectedRowModel().rows
    const IdsArray = rows.map((item: any) => item.original._id)
    console.log(IdsArray)
    onDelete(IdsArray)
    table.resetRowSelection();
  }

  

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-full flex items-center gap-5">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter title..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm bg-light-bg dark:bg-dark-bg dark:focus:ring-offset-0 dark:focus-visible:ring-0 focus-visible:ring-0"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-light-bg dark:bg-dark-bg">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize bg-light-bg dark:bg-dark-bg"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger>
              <div className="px-3 py-3 rounded-full cursor-pointer text-white bg-light-error dark:bg-dark-error hover:scale-90 transition-all ease-in 
              will-change-transform">
                <Trash />
              </div>
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
                <DialogClose asChild>
                  <Button
                    onClick={(e) => hadleDeleteSelectedRows(e)}
                    className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
                 text-white dark:text-white hover:scale-90 transition-all ease-in"
                  >
                    Xóa
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          onClick={() => onAdd()}
          className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                    text-white dark:text-white hover:scale-90 transition-all ease-in"
        >
          <Plus width={20} height={20} className="mr-1"/>
          Thêm mới
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-5">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
