import express from "express";
import {
    submitContactForm,
    getAllContacts,
} from "../Controllers/contactController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/verify.js";

const contactRouter = express.Router();

contactRouter.post("/", submitContactForm); // Anyone can submit
contactRouter.get("/", verifyAdmin, getAllContacts); // Admin only

export default contactRouter;
