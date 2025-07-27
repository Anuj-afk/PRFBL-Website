import express from "express"
import {registerUser, loginUser, registerAdmin, loginAdmin, adminInfo} from "../Controllers/userController.js";
import { verifyAdmin } from "../middlewares/verify.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/admin", verifyAdmin, registerAdmin)
userRouter.post("/adminLogin", loginAdmin)
userRouter.get("/admin/:username", verifyAdmin, adminInfo)

export default userRouter;