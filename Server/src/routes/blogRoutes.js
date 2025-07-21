import express from "express";
import multer from "multer";
import {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} from "../Controllers/blogController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/verify.js";

const blogRouter = express.Router();
const upload = multer({ dest: "uploads/blogs/" });

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);

// Admin-only routes
blogRouter.post("/", verifyAdmin, upload.single("coverImage"), createBlog);
blogRouter.put("/:id", verifyAdmin, upload.single("coverImage"), updateBlog);
blogRouter.delete("/:id",  verifyAdmin, deleteBlog);

export default blogRouter;
