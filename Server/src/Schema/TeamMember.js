import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin", // or whatever your admin model is named
        required: true
    },
    role: { type: String, required: true },
    department: { type: String },
    image: { type: String }, // path to profile image
    juniorOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember", // references another team member
        default: null
    }
});

export default mongoose.model("TeamMember", teamMemberSchema);
