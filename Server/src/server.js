import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import {nanoid} from 'nanoid';
// import jwt from "jsonwebtoken";
import cors from "cors";
import userRouter from './routes/userRoutes.js';
import cmsRoutes from "./routes/cmsRoutes.js"
import teamRouter from './routes/teamRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import contactRouter from './routes/contactRoutes.js';

const server = express()
server.use(express.json())
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true,
})

server.use(cors())
server.use(userRouter)
server.use(cmsRoutes)
server.use("/uploads", express.static("uploads")); // Serve profile images
server.use("/api/team", teamRouter);
server.use("/api/blogs", blogRouter);
server.use("/api/contact", contactRouter);

let port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});