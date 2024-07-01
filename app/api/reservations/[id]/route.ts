import reservation from "@/lib/models/reservation"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, {params}: {params: {id:string}}) => {
    const reservation_id = params.id
    await connectToDB()
   try {
      const reservationDetail = await reservation.findById(reservation_id).populate('addres_id')
   return NextResponse.json({reservationDetail}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}){
   const {id} = params
   const body = await req.json()
   const {
      table_id,
      userName,
      party_size,
      payment_method,
      detailAddress,
      province,
      district, 
      ward 
     } = body
   if(!id) return NextResponse.json({message: "There is no Id to update reservation"}, {status: 401})
    if(!userName || !party_size || !payment_method || !detailAddress || !province || !district || !ward) return NextResponse.json({message: "All data are required"}, {status: 401})


   await connectToDB()
  try {
  const newreservation: any= await reservation.findByIdAndUpdate({_id: id}, body, {new: true})
  return NextResponse.json({message: 'Update Successfully!', reservation: newreservation}, {status: 201})
  } catch (error) {
   console.log("Inventories_Error", error)
   return NextResponse.json({message: "Internal Server Error"}, {status: 500})
  }
}