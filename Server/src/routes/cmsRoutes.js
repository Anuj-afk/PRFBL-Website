import express from "express";
import {
    createPage,
    getPage,
    addSectionToPage,
    updateSection,
    deleteSection,
    getAllPages
} from "../Controllers/cmsController.js";
import { verifyAdmin } from "../middlewares/verify.js";

const router = express.Router();

router.post("/pages", verifyAdmin, createPage);
router.get("/pages/:slug", getPage);
router.get("/pages",verifyAdmin, getAllPages);
router.post("/pages/:slug/sections", verifyAdmin, addSectionToPage);
router.put("/sections/:id", verifyAdmin, updateSection);
router.delete("/sections/:id", verifyAdmin, deleteSection);

export default router;
