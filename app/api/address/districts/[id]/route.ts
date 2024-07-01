import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, {params}: {params: {id:string}}) => {
    const province_id = params.id
   try {
    const res = await fetch('https://vapi.vnappmob.com/api/province/district/'+province_id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }, })
    const data = await res.json()
   return NextResponse.json(data.results, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
