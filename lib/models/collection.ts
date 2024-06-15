import mongoose from "mongoose";

const collectionSchame = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    isShow: {
        type: Boolean,
        required: true,
        default: true,
    },
    dishes_id: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'dish',
        },
    ]
}, 
{
    timestamps: true
}
)

export default mongoose.models.collection || mongoose.model("collection", collectionSchame)