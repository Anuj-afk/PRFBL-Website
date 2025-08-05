import express from "express";
import {
    createPage,
    getPage,
    addSectionToPage,
    updateSection,
    deleteSection,
    getAllPages,
    updatePage,
    getAllSections,
    deletePage,
    getSection,
    getSectionByPage,
    removeSectionFromPage,
    getSectionNotInPage
} from "../Controllers/cmsController.js";
import { verifyAdmin } from "../middlewares/verify.js";

const router = express.Router();

router.post("/pages", verifyAdmin, createPage);
router.get("/pages/:slug", getPage);
router.get("/pages",verifyAdmin, getAllPages);
router.put("/pages/:slug", verifyAdmin, updatePage);
router.post("/pages/:slug/sections", verifyAdmin, addSectionToPage);
router.put("/sections/:id", verifyAdmin, updateSection);
router.delete("/sections/:id", verifyAdmin, deleteSection);
router.get("/sections", verifyAdmin, getAllSections);
router.delete("/pages/:slug", verifyAdmin, deletePage);
router.get("/sections/:id", verifyAdmin, getSection);
router.get("/sections/:slug", verifyAdmin, getSectionByPage);
router.post("/pages/:sectionId/:slug", verifyAdmin, removeSectionFromPage);
router.get("/page/sections/:slug", verifyAdmin, getSectionNotInPage);

export default router;
