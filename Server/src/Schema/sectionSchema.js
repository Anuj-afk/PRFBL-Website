import mongoose, { Schema } from "mongoose";

const sectionSchema = new mongoose.Schema(
    {
        page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page",
            required: true,
        },
        type: { type: String, required: true },
        order: { type: Number, default: 0 , unique: true},
        content: { type: Object, default: {} },
        editorState: {
            type: Object, 
        },

        htmlContent: {
            type: String,
        },

        plainText: {
            type: String,
        },

        activated: { type: Boolean, default: true },
        has_link: {
            type: Boolean,
            default: false
        },
        links: [{
            type: {
                type: String,
                enum: ['internal', 'external'],
                required: true
            },
            url: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }]
    },
    {
        timestamps: {
            createdAt: "joinedAt",
        },
    }
);

export default mongoose.model("Section", sectionSchema);
