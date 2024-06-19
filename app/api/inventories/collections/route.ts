import collection from "@/lib/models/collection";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
   await connectToDB()
   try {
    const {title, desc, image} = await req.json()
    
    if(!title || !desc || !image) return new NextResponse("All data are required", {status: 401})
    const existedData = await collection.findOne({title})
    if(existedData) return new NextResponse("Collection is available", {status: 401})
   const newcollection = await collection.create({title, desc, image})
   return NextResponse.json({newcollection, message: 'Succussfully!'}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return new NextResponse("Internal Server Error", {status: 500})
   }
}

export const GET = async (req: NextRequest) => {
   await connectToDB()
   try {
   const collections: any= await collection.find({})
   return new NextResponse(JSON.stringify(collections), {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return new NextResponse("Internal Server Error", {status: 500})
   }
}

export const DELETE = async (req: NextRequest) => {
   await connectToDB()
   try {
      const IdsArray = await req.json()
   const collections: any = await collection.deleteMany({ _id: {$in: IdsArray}})
   return new NextResponse(JSON.stringify(collections), {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return new NextResponse("Internal Server Error", {status: 500})
   }
}