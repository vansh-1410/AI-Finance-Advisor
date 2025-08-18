import jwt from "jsonwebtoken"

const auth = (req , res , next) => {
    const raw = req.headers.authorization || ""
    const token = raw.startsWith("Bearer ") ? raw.split(" ")[1] : null
    if (!token) return res.status(401).json({ message : "unauthorized" })
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch {
        res.status(401).json({ message : "invalid token" })
    }
}

export default auth
