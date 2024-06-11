import { Payment, columns } from "@/components/paginationTable/Columns"
import { DataTable } from "@/components/paginationTable/DataTable"
// import { v4 } from "uuid";
import React from "react"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return new Array(50).fill(null).map(() => ({
    id: crypto.randomUUID(),
    amount: Math.random() * 1000,
    status: "pending",
    email: "m@example.com",
  }))
}
export default async function DishesPage() {
  const data = await getData()
  return (
    <div className="w-full h-[calc(100vh-120px)] px-10 py-4 bg-light-bg_2 dark:bg-dark-bg_2 rounded-md overflow-auto">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
