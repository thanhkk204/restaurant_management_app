import { LocationType } from "@/app/(admin)/dashboard/reservations/page";
import location from "@/lib/models/location";
import table from "@/lib/models/table";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}){
    const {id} = params
    const {locationInRestaurant} = await req.json()
    if(!id) return NextResponse.json({message: "There is no Id to update location"}, {status: 401})
    if(!locationInRestaurant) return NextResponse.json({message: "There is no body to update location"}, {status: 401})

    await connectToDB()
   try {
   const newLocation = await location.findByIdAndUpdate({_id: id}, {locationInRestaurant: locationInRestaurant}) as LocationType
   return NextResponse.json({message: 'Update Successfully!', newLocation}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
export async function GET(req: NextRequest, { params }: { params: { id: string } }){
    const {id} = params
    if(!id) return NextResponse.json({message: "There is no Id to get detail location"}, {status: 401})

    await connectToDB()
   try {
   const newLocation = await location.findOne({_id: id}) as LocationType
   return NextResponse.json(newLocation, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
    const {id} = params
    if(!id) return NextResponse.json({message: "There is no Id to delete detail location"}, {status: 401})

    await connectToDB()
   try {
   await table.deleteMany({ location_id: id })
   await location.findByIdAndDelete({_id: id}) 
   return NextResponse.json({message: "Delete Successfully!"}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}