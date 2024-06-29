import mongoose from "mongoose";

const employeeSchame = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"],
    },
    workPosition: {
        type: String,
        required: true,
    },
    employStatus: {
        type: String,
        enum: ["ACTIVE", "LEAVED"],
        default: "ACTIVE"
    }
}, 
{
    timestamps: true
}
)

export default mongoose.models.employee || mongoose.model("employee", employeeSchame)