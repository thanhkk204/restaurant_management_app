import dish from "@/lib/models/dish";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}){
    const {id} = params
    const body = await req.json()
    console.log(body);
    if(!id) return NextResponse.json({message: "There is no Id to update dish"}, {status: 500})
    if(!body) return NextResponse.json({message: "There is no body to update dish"}, {status: 500})

    await connectToDB()
   try {
   const newDish: any= await dish.findByIdAndUpdate({_id: id}, body)
   return NextResponse.json({message: 'Update Successfully!', newDish}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
export async function GET(req: NextRequest, { params }: { params: { id: string } }){
    const {id} = params
    if(!id) return NextResponse.json({message: "There is no Id to get detail dish"}, {status: 500})

    await connectToDB()
   try {
   const newDish: any= await dish.findOne({_id: id})
   return NextResponse.json(newDish, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}