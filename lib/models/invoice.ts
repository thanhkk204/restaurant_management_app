import mongoose from "mongoose"

const invoiceSchame = new mongoose.Schema(
  {
    reservation_id: {
      type: mongoose.Schema.ObjectId,
      ref: "reservation",
      required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    total_amount: {
      type: Number,
      required: true,
    },
    time_to_fisnish: {
      type: String,
    },
    discount_id: {
        type: mongoose.Schema.ObjectId,
        ref: "discount",
      },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.invoice || mongoose.model("invoice", invoiceSchame)
