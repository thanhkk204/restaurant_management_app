import reservation from "@/lib/models/reservation"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  await connectToDB()
  try {
    const reservations = await reservation.deleteMany({})
    return NextResponse.json({ message: "success" }, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
