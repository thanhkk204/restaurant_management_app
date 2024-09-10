import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"
import User from "@/lib/models/user"

export const POST = async (req: NextRequest) => {
    await connectToDB()
    try {
      const { email } = await req.json()
      console.log('user verify')
      const existingUser = await User.findOne({email: email})
      return NextResponse.json(
        existingUser,
        { status: 201 }
      )
    } catch (error) {
      console.log("Inventories_Error", error)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      )
    }
  }