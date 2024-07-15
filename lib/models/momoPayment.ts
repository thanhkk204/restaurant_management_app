import mongoose from "mongoose"

const momoPaymentSchame = new mongoose.Schema(
  {
    partnerCode: {
      type: String,
      required: true
    },
    orderId: {
      type: String,
      required: true
    },
    requestId: {
      type: String,
      required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transId: {
        type: Number
    },
    status: {
      type: String,
      enum: ["SUCCESS", "REFUND"],
      default: 'SUCCESS',
    },
    refundAtTime: {
        type: Date
    },
    refundReson: {

    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.momoPayment || mongoose.model("momoPayment", momoPaymentSchame)
