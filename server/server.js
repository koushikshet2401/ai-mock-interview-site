import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDB from "./config/db.js"
import interviewRoutes from "./routes/interviewRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/interview", interviewRoutes)
app.use("/api/ai", aiRoutes)

app.get("/", (req, res) => {
  res.send("AI Interview Backend Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})