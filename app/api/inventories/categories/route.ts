import category from "@/lib/models/category";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
   await connectToDB()
   try {
    const {title, desc} = await req.json()
    
    if(!title) return NextResponse.json({message: "All data are required"}, {status: 401})
    const existedData = await category.findOne({title})
    if(existedData) return NextResponse.json({message: "Category is available"}, {status: 401})
   const Category = await category.create({title: title, desc: desc})
   return NextResponse.json(Category, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export const GET = async (req: NextRequest) => {
   await connectToDB()
   try {
   const categories: any= await category.find({})
   return NextResponse.json(categories, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export const DELETE = async (req: NextRequest) => {
   await connectToDB()
   try {
      const IdsArray = await req.json()
   const categories: any = await category.deleteMany({ _id: {$in: IdsArray}})
   return NextResponse.json(categories, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}