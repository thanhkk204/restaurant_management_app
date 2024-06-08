import category from "@/lib/models/category";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
   await connectToDB()
   try {
    const {name, isShow} = await req.json()
    
    if(!name || !isShow) return new NextResponse("All data are required", {status: 401})
    const existedData = await category.findOne({name})
    if(existedData) return new NextResponse("Category is available", {status: 401})
   const newCategory = await category.create({name: name, isShow: isShow})
   return new NextResponse(newCategory, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return new NextResponse("Internal Server Error", {status: 500})
   }
}

export const GET = async (req: NextRequest) => {
   await connectToDB()
   try {
   const categories: any= await category.find({})
   return new NextResponse(categories, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return new NextResponse("Internal Server Error", {status: 500})
   }
}