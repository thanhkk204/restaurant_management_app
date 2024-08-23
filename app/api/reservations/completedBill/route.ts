import { TableType } from "@/app/(admin)/dashboard/reservations/page"
import invoice from "@/lib/models/invoice"
import reservation from "@/lib/models/reservation"
import table from "@/lib/models/table"
import { connectToDB } from "@/lib/mongoDb"
import { ReservationType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const { reservation_id, total_money, paid_money } = await req.json()
  if (!reservation_id || !total_money || !paid_money)
    return NextResponse.json(
      { message: "All data fields are required" },
      { status: 401 }
    )
  await connectToDB()
  try {
    //  Check whether reservation was paid
    const isPaidForBill = await invoice.findOne({
      reservation_id: reservation_id,
    })
    if (isPaidForBill)
      return NextResponse.json(
        { message: "Bill has been paid" },
        { status: 401 }
      )
    // Reset status of reservation and table before create
    const completedReservation = (await reservation.findByIdAndUpdate(
      { _id: reservation_id },
      { status: "COMPLETED" },
      { new: true }
    )) as ReservationType
    // check the next reservation to decide how to update table status
    const nextReservation = await reservation.findOne({table_id: completedReservation.table_id, status: "RESERVED"})
    const newStatus = nextReservation ? "ISBOOKED" : "AVAILABLE"
    await table.findByIdAndUpdate(
      { _id: completedReservation.table_id },
      { status: newStatus },
      { new: true }
    )

    const completedBill = await invoice.create({
      reservation_id,
      total_money,
      paid_money,
    })
    return NextResponse.json({ completedBill }, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
