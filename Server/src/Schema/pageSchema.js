import mongoose, { Schema } from "mongoose";

const pageSchema = mongoose.Schema({

    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    URL: { type: String, required: true, unique: true },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
    activated: { type: Boolean, default: true } // Added activated field



},
    {
        timestamps: {
            createdAt: 'joinedAt'
        }

    })

export default mongoose.model("Page", pageSchema);