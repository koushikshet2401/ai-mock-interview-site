import express from "express"
import { generateInterview } from "../controllers/aiController.js"

const router = express.Router()

router.post("/generate", generateInterview)

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI interview API working"
  })
})

export default router