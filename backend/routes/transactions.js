import express from "express"
import auth from "../middleware/auth.js"
import Transaction from "../models/Transaction.js"

const router = express.Router()

router.use(auth)

router.post("/" , async (req , res) => {
    const { type , amount , category , date , note } = req.body

    try {
        const item = await Transaction.create({
            user : req.userId ,
            type ,
            amount ,
            category ,
            date ,
            note
        })

        res.status(201).json(item)
    } catch {
        res.status(400).json({ message : "could not create transaction" })
    }
})

router.get("/" , async (req , res) => {
    try {
        const list = await Transaction.find({ user : req.userId }).sort({ date : -1 })
        res.json(list)
    } catch {
        res.status(500).json({ message : "could not fetch transactions" })
    }
})

router.delete("/:id" , async (req , res) => {
    try {
        const removed = await Transaction.findOneAndDelete({ _id : req.params.id , user : req.userId })
        if (!removed) return res.status(404).json({ message : "not found" })
        res.json({ ok : true })
    } catch {
        res.status(500).json({ message : "could not delete" })
    }
})

export default router
