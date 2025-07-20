import express from "express";
import {
    createPage,
    getPage,
    addSectionToPage,
    updateSection,
    deleteSection
} from "../Controllers/cmsController.js";

const router = express.Router();

router.post("/pages", createPage);
router.get("/pages/:slug", getPage);
router.post("/pages/:slug/sections", addSectionToPage);
router.put("/sections/:id", updateSection);
router.delete("/sections/:id", deleteSection);

export default router;
