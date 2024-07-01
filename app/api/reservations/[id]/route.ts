import reservation from "@/lib/models/reservation"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, {params}: {params: {id:string}}) => {
    const reservation_id = params.id
   try {
      const reservationDetail = await reservation.findById(reservation_id).populate('addres_id')
   return NextResponse.json({reservationDetail}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
