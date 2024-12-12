import reservation from "@/lib/models/reservation"
import table from "@/lib/models/table"
import { connectToDB } from "@/lib/mongoDB"
import { ReservationType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { reservation_id: string } }
) {
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
      const now = new Date()
       // update privious table tatus
       // Tìm reservation có trạng thái "RESERVED" trong tương lai cho table này
       const reservedReservation = await reservation.findOne({
        // Tìm những đơn đặt bàn trong tương lai ngoại trừ đơn vừa chuyển bàn
        _id: { $ne: reservation_id },
        table_id: oldReservation.table_id,
        status: "RESERVED",
        prepay: {$gt: 0},
        startTime: { $gte: now },
      });
  
      // Cập nhật trạng thái của table dựa trên điều kiện nếu có đơn đặt bàn trong tương lai sẽ chuyển thành ISBOOKED
      const newStatus = reservedReservation ? "ISBOOKED" : "AVAILABLE";
  
      await table.updateOne(
        { _id: oldReservation.table_id },
        { $set: { status: newStatus } }
      );

      // Update current table tatus
      const isCurrentTableStatus = new Date(oldReservation.startTime) <= now ? "ISSERVING" : "ISBOOKED"
      await table.findByIdAndUpdate(table_id, { $set: { status: isCurrentTableStatus } })
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
