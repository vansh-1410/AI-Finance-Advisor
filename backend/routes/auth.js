import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

const makeToken = (id) => {
    return jwt.sign({ id } , process.env.JWT_SECRET , { expiresIn : "7d" })
}

router.post("/register" , async (req , res) => {
    const { name , email , password } = req.body

    if (!name || !email || !password) return res.status(400).json({ message : "missing fields" })

    try {
        const exists = await User.findOne({ email : email.toLowerCase().trim() })
        if (exists) return res.status(409).json({ message : "user already exists" })

        const user = await User.create({ name , email , password })
        const token = makeToken(user._id)

        res.status(201).json({
            token ,
            user : { id : user._id , name : user.name , email : user.email }
        })
    } catch (e) {
        res.status(500).json({ message : "registration failed" })
    }
})

router.post("/login" , async (req , res) => {
    const { email , password } = req.body

    if (!email || !password) return res.status(400).json({ message : "missing fields" })

    try {
        const user = await User.findOne({ email : email.toLowerCase().trim() })
        if (!user) return res.status(400).json({ message : "invalid credentials" })

        const ok = await user.matchPassword(password)
        if (!ok) return res.status(400).json({ message : "invalid credentials" })

        const token = makeToken(user._id)

        res.json({
            token ,
            user : { id : user._id , name : user.name , email : user.email }
        })
    } catch (e) {
        res.status(500).json({ message : "login failed" })
    }
})

export default router
