import mongoose, { Schema } from "mongoose";

const pageSchema = mongoose.Schema({

    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }]



},
    {
        timestamps: {
            createdAt: 'joinedAt'
        }

    })

export default mongoose.model("Page", pageSchema);