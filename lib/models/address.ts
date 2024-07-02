import mongoose from "mongoose"

const addressSchame = new mongoose.Schema(
  {
    province: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    ward: {
      type: String,
      required: true
    },
    detailAddress: {
        type: String
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.address || mongoose.model("address", addressSchame)
