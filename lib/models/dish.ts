import mongoose from "mongoose";

const dishSchame = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    isShow: {
        type: Boolean,
        required: true
    },
}, 
{
    timestamps: true
}
)

export default mongoose.models.dish || mongoose.model("dish", dishSchame)