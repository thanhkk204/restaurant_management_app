import orderedDish from "@/lib/models/orderedDish"
import reservation from "@/lib/models/reservation"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, {params}: {params: {id:string}}) => {
    const reservation_id = params.id
    if(!reservation_id) return NextResponse.json({message: "Missing reservation Id"},{status: 401})
    await connectToDB()
   try {
      const orderedFoods = await orderedDish.find({reservation_id: reservation_id}).populate('dish_id')
   return NextResponse.json(orderedFoods, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
