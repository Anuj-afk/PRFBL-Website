import mongoose, { Schema } from "mongoose";

const sectionSchema = mongoose.Schema({

    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
    type: { type: String, required: true },
    order: { type: Number, default: 0 },
    content: { type: Object, default: {} },
    activated: { type: Boolean, default: true } 



},
    {
        timestamps: {
            createdAt: 'joinedAt'
        }

    })

export default mongoose.model("Section", sectionSchema);