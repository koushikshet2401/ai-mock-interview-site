import express from "express"

import {
  createFeedback,
  getInterviewById,
  getFeedbackByInterviewId,
  getLatestInterviews,
  getInterviewsByUserId,
} from "../controllers/interviewController.js"

const router = express.Router()

router.post("/feedback", createFeedback)

router.get("/:id", getInterviewById)

router.get("/feedback/interview", getFeedbackByInterviewId)

router.get("/latest", getLatestInterviews)

router.get("/user/:userId", getInterviewsByUserId)

export default router