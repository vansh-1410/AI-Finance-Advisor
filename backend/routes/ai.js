import express from "express"
import axios from "axios"
import auth from "../middleware/auth.js"
import Transaction from "../models/Transaction.js"

const router = express.Router()

router.use(auth)

router.get("/advice" , async (req , res) => {
    try {
        const items = await Transaction.find({ user : req.userId }).sort({ date : -1 })
        const { data } = await axios.post("http://127.0.0.1:5001/advice" , { transactions : items })
        res.json(data)
    } catch {
        res.status(500).json({ message : "ai service unavailable" })
    }
})

export default router
