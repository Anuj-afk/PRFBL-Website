import express from "express";
import upload from "../utils/multerConfig.js";
import {
    createTeamMember,
    getAllTeamMembers,
    getTeamMember,
    updateTeamMember,
    deleteTeamMember
} from "../Controllers/teamController.js";
import { verifyAdmin } from "../middlewares/verify.js";

const teamRouter = express.Router();

teamRouter.post("/", verifyAdmin, upload.single("image"), createTeamMember);
teamRouter.get("/", verifyAdmin, getAllTeamMembers);
teamRouter.get("/:id", verifyAdmin, getTeamMember);
teamRouter.put("/:id", verifyAdmin, upload.single("image"), updateTeamMember);
teamRouter.delete("/:id", verifyAdmin, deleteTeamMember);

export default teamRouter;
