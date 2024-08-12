import { TableType } from "@/app/(admin)/dashboard/reservations/page"
import table from "@/lib/models/table"
import { connectToDB } from "@/lib/mongoDb"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const { number_of_seats, name } = await req.json()
  if (!id)
    return NextResponse.json(
      { message: "There is no Id to update table" },
      { status: 401 }
    )
  if (!number_of_seats || !name)
    return NextResponse.json(
      { message: "There is no body to update table" },
      { status: 401 }
    )

  await connectToDB()
  try {
    const newTable = (await table.findByIdAndUpdate(
      { _id: id },
      { number_of_seats: number_of_seats, name: name }
    )) as TableType
    return NextResponse.json(
      { message: "Update Successfully!", newTable },
      { status: 201 }
    )
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!id)
    return NextResponse.json(
      { message: "There is no Id to get detail table" },
      { status: 401 }
    )
  await connectToDB()
  try {
    const newTable = (await table.findById(id)) as TableType
    return NextResponse.json({ table: newTable }, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!id)
    return NextResponse.json(
      { message: "There is no Id to delete detail table" },
      { status: 401 }
    )

  await connectToDB()
  try {
    await table.findByIdAndDelete({ _id: id })
    return NextResponse.json(
      { message: "Delete Successfully!" },
      { status: 201 }
    )
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
