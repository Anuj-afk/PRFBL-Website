import jwt from "jsonwebtoken";
import User from "../Schema/UserSchema.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

