import mongoose from "mongoose";

const discountSchame = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    discountType: {
        type: String,
        enum: ["FIXEDAMOUNT", "PERCENTAGE"],
        default: 'FIXEDAMOUNT',
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    beginDate: {
        type: Date,
        required: true,
        default: null
    },
    expiryDate: {
        type: Date,
        required: true,
        default: null
    },
    maximumOrder: {
        type: Number,
        required: true
    }
}, 
{
    timestamps: true
}
)

export default mongoose.models.discount || mongoose.model("discount", discountSchame)