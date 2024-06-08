import mongoose from "mongoose";

const categorySchame = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isShow: {
        type: Boolean,
        required: true,
    }
}, 
{
    timestamps: true
}
)

export default mongoose.models.category || mongoose.model("category", categorySchame)