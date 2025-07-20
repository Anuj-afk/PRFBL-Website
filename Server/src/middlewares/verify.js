import jwt from "jsonwebtoken"

export const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({"error": "No token provided"})
    }
    jwt.verify(token, process.env.SECRET_ACCESS_KEY_ADMIN, (err, user) => {
        if(err) {
            return res.status(403).json({"error": err})
        }
        req.Id = user.id;
        next();
    })
}