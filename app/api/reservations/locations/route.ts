import { LocationType } from "@/app/(admin)/dashboard/reservations/page";
import location from "@/lib/models/location";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
   await connectToDB()
   try {
    const {numberOfLocation} = await req.json()
    if(!numberOfLocation) return NextResponse.json({message: "All data are required"}, {status: 401})
    const newlocation = await location.create({order: numberOfLocation})
   return NextResponse.json({newlocation, message: 'Succussfully!'}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export const GET = async (req: NextRequest) => {
   await connectToDB()
   try {
   const locations = await location.find({}).sort({ order: 1 }) as LocationType[]
   const numberOfLocation: number = await location.find().countDocuments() + 1
   return NextResponse.json({locations, numberOfLocation }, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export const DELETE = async (req: NextRequest) => {
   await connectToDB()
   try {
      const IdsArray = await req.json()
   const locations: any = await location.deleteMany({ _id: {$in: IdsArray}})
   return NextResponse.json({locations, message: "Successfully!"}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
export const PUT = async (req: NextRequest)=>{
   const {newArray} = await req.json()
   await connectToDB()
   const LocationArray = newArray as LocationType[]
   if(!newArray) return NextResponse.json({message: "Array for update is currently empty"}, {status: 401})
   try {
      LocationArray.forEach((item, index) => {
        updateForNewLocation(item, index)
     });
      return NextResponse.json({message: "Successfully"}, {status: 201})
   } catch (error) {
      console.log(error)
   }
}

const updateForNewLocation = async (item: LocationType, index: number) =>{
   await location.findByIdAndUpdate({_id: item._id}, {order: index})
}