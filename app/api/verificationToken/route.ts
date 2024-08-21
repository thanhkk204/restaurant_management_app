import { getVerificationTokenByToken } from "@/actions/tokens"
import user from "@/lib/models/user"
import verificationToken from "@/lib/models/verificationToken"
import { connectToDB } from "@/lib/mongoDb"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (req: NextRequest) => {
    await connectToDB()
    const { token } = await req.json()
    try {
        const existingToken = await getVerificationTokenByToken(token)
        if(!existingToken) return NextResponse.json({error: "There is no token in database" },{ status: 401 })
        const expired = new Date().getTime() > new Date(existingToken.expire).getTime()
        if(expired) return NextResponse.json({ error: "Token was expired" },{ status: 401 })

        await user.findOneAndUpdate({email: existingToken.email}, {emailVerified: new Date()})
        await verificationToken.findByIdAndDelete(existingToken._id)
        return NextResponse.json({success: "Verify Successfully!" },{ status: 201 })
      } catch (error) {
        console.log("Error from checkOutVerificationToken: ", error)
        return NextResponse.json({ error: "There are something wrong" },{ status: 401 })
      }

  }
  