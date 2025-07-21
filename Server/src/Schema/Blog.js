import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String }, // URL or path
    createdAt: { type: Date, default: Date.now },
    author: { type: String },
});

export default mongoose.model("Blog", blogSchema);
