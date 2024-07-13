import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    console.log('thanh')
    
    const body = await req.json()
    console.log('body',body)

   await connectToDB()
   
   const res = {
    CODAmount: 3000000,
    CODTransferDate: null,
    ClientOrderCode: "",
    ConvertedWeight: 200,
    Description: "Tạo đơn hàng",
    Fee: {
    CODFailedFee: 0,
    CODFee: 0,
    Coupon: 0,
    DeliverRemoteAreasFee: 0,
    DocumentReturn: 0,
    DoubleCheck: 0,
    Insurance: 17500,
    MainService: 53900,
    PickRemoteAreasFee: 53900,
    R2S: 0,
    Return: 0,
    StationDO: 0,
    StationPU: 0,
    Total: 0
    },
    Height: 10,
    IsPartialReturn: false,
    Length: 10,
    OrderCode: "Z82BS",
    PartialReturnCode: "",
    PaymentType: 1,
    Reason: "",
    ReasonCode: "",
    ShopID: 81558,
    Status:"ready_to_pick",
    Time:"2021-11-11T03:52:50.158Z",
    TotalFee:71400,
    Type:"create",
    Warehouse:"Bưu Cục 229 Quan Nhân-Q.Thanh Xuân-HN",
    Weight:10,
    Width:10
}
   try {
    return NextResponse.json(res, {status: 200})
   
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}