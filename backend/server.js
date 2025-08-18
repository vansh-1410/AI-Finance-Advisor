import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import transactionRoutes from "./routes/transactions.js"
import aiRoutes from "./routes/ai.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("mongodb connected"))
    .catch(() => { console.error("mongodb connection failed") ; process.exit(1) })

app.use("/api/auth" , authRoutes)
app.use("/api/transactions" , transactionRoutes)
app.use("/api/ai" , aiRoutes)

const port = process.env.PORT || 5000
app.listen(port , () => console.log(`backend running on ${port}`))
