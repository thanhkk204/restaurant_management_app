import reservation from "@/lib/models/reservation"
import table from "@/lib/models/table"
import { connectToDB } from "@/lib/mongoDB"
import { ReservationType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { reservation_id: string } }
) {
  console.log("thanh")
  const { reservation_id } = params
  const body = await req.json()
  const { table_id, type } = body

  if (!reservation_id)
    return NextResponse.json(
      { message: "There is no Id to update reservation" },
      { status: 401 }
    )
  if (!body)
    return NextResponse.json(
      { message: "Body must be existed" },
      { status: 401 }
    )

  await connectToDB()
  try {
    const oldReservation = (await reservation.findById(
      reservation_id
    )) as ReservationType

    //  Handle both two situation select table and reselect table (update table_id)
    if (type === "SELECT") {
      // update selected table status to ISSERVING
      await table.findByIdAndUpdate(table_id, { status: "ISSERVING" })
      //  update reservation table_id
      await reservation.findByIdAndUpdate(
        { _id: reservation_id },
        { table_id: table_id, status: "SEATED", startTime: new Date() },
        { new: true }
      )
    } else if (type === "RESELECT") {
      // update privious table tatus to AVAILABLE
      await table.findByIdAndUpdate(oldReservation.table_id, {
        status: "AVAILABLE",
      })
      await table.findByIdAndUpdate(table_id, { status: "ISSERVING" })
      //  update reservation table_id
      await reservation.findByIdAndUpdate(
        { _id: reservation_id },
        { table_id: table_id },
        { new: true }
      )
    }

    return NextResponse.json({ message: "Successfully!" }, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
