import mongoose from "mongoose";

const resetPasswordTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    expire: {
        type: Date,
        required: true
    }
}, 
{
    timestamps: true
})

export default mongoose.models?.resetPasswordToken || mongoose.model("resetPasswordToken", resetPasswordTokenSchema)