import { TableType } from "@/app/(admin)/dashboard/reservations/page"
import address from "@/lib/models/address"
import orderedDish from "@/lib/models/orderedDish"
import reservation from "@/lib/models/reservation"
import table from "@/lib/models/table"
import { connectToDB } from "@/lib/mongoDB"
import { AddressType, ReservationType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic';
export const POST = async (req: NextRequest) => {
  const {
    table_id,
    userName,
    party_size,
    payment_method,
    startTime,
    detailAddress,
    province,
    district,
    ward,
  } = await req.json()
  await connectToDB()
  try {
    if (
      !userName ||
      !party_size ||
      !payment_method ||
      !detailAddress ||
      !province ||
      !district ||
      !ward
    )
      return NextResponse.json(
        { message: "All data are required" },
        { status: 401 }
      )

    const newAddress = (await address.create({
      province: province,
      district: district,
      ward: ward,
      detailAddress,
    })) as AddressType
    // 4: create reservation
    const newReservation = (await reservation.create({
      userName,
      party_size,
      payment_method,
      table_id,
      startTime,
      status: "SEATED",
      addres_id: newAddress._id,
    })) as ReservationType
    // 5: if create reservation successfully update table status
    if (newReservation) {
      const newTable = await table.findByIdAndUpdate(
        { _id: table_id },
        { status: "ISSERVING" },
        { new: true }
      )
    }
    return NextResponse.json(
      { message: "Succussfully!", reservation: newReservation },
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

export const GET = async (req: NextRequest) => {
  await connectToDB()
  try {
    await orderedDish.find({})
    const reservations = (await reservation
      .find({})
      .sort({ createdAt: -1 })
      .populate("addres_id")
      .populate("user_id")
      .populate("table_id")
      .populate("dish_id")) as ReservationType[]
    return NextResponse.json({ reservations }, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
