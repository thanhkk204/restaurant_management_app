import { TableType } from "@/app/(admin)/dashboard/reservations/page"
import reservation from "@/lib/models/reservation"
import { ReservationType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongoDB"

export async function GET(
  req: NextRequest,
  { params }: { params: { table_id: string } }
) {
  const { table_id } = params
  if (!table_id)
    return NextResponse.json(
      { message: "There is no Id to get reservation for this table" },
      { status: 401 }
    )
  await connectToDB()
  try {
    const reservations = (await reservation.find({
      table_id: table_id,
      status: "RESERVED",
    })) as ReservationType[]
    return NextResponse.json({ reservations: reservations }, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
