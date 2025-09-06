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
    getSectionNotInPage,
    getSectionHasLinks,  // Add this import
    addLinkToSection, // Add this import
    getSectionLinks,
    deleteLink // Add this import
} from "../Controllers/cmsController.js";
import { verifyAdmin } from "../middlewares/verify.js";

const router = express.Router();

router.post("/pages", verifyAdmin, createPage);
router.get("/pages/:slug", getPage);
router.get("/pages",verifyAdmin, getAllPages);
router.put("/pages/:slug", verifyAdmin, updatePage);
router.post("/pages/:slug/sections", verifyAdmin, addSectionToPage);
router.put("/sections/:id/:slug", verifyAdmin, updateSection);
router.delete("/sections/:id", verifyAdmin, deleteSection);
router.get("/sections", verifyAdmin, getAllSections);
router.delete("/pages/:slug", verifyAdmin, deletePage);
router.get("/sections/:id", verifyAdmin, getSection);
router.get("/sections/:slug", verifyAdmin, getSectionByPage);
router.delete("/pages/:sectionId/:slug", verifyAdmin, removeSectionFromPage);
router.get("/sections/:id/has-links", verifyAdmin, getSectionHasLinks); // Add this route
router.get("/page/sections/:slug", verifyAdmin, getSectionNotInPage);
router.post('/sections/:sectionId/links', verifyAdmin, addLinkToSection);
router.get('/sections/:sectionId/links', verifyAdmin, getSectionLinks);
router.delete('/sections/:sectionId/links/:linkId', verifyAdmin, deleteLink);

export default router;
