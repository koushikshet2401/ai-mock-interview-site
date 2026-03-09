import Interview from "../models/interview.js"
import Feedback from "../models/Feedback.js"

import { generateObject } from "ai"
import { google } from "@ai-sdk/google"

import feedbackSchema from "../constants/feedbackSchema.js"

export const createFeedback = async (req, res) => {
  try {
    const { interviewId, userId, transcript } = req.body

    const formattedTranscript = transcript
      .map((sentence) => `- ${sentence.role}: ${sentence.content}\n`)
      .join("")

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: feedbackSchema,
      prompt: `
You are an AI interviewer analyzing a mock interview.

Transcript:
${formattedTranscript}

Score the candidate from 0 to 100 in:

- Communication Skills
- Technical Knowledge
- Problem Solving
- Cultural & Role Fit
- Confidence & Clarity
`,
    })

    const feedback = await Feedback.create({
      interviewId,
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
    })

    res.json({
      success: true,
      feedbackId: feedback._id,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
}
export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)

    res.json(interview)
  } catch (error) {
    res.status(500).json({ message: "Error fetching interview" })
  }
}
export const getFeedbackByInterviewId = async (req, res) => {
  try {
    const { interviewId, userId } = req.query

    const feedback = await Feedback.findOne({
      interviewId,
      userId,
    })

    res.json(feedback)
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback" })
  }
}
export const getLatestInterviews = async (req, res) => {
  try {
    const { userId } = req.query

    const interviews = await Interview.find({
      finalized: true,
      userId: { $ne: userId },
    })
      .sort({ createdAt: -1 })
      .limit(20)

    res.json(interviews)
  } catch (error) {
    res.status(500).json({ message: "Error fetching interviews" })
  }
}
export const getInterviewsByUserId = async (req, res) => {
  try {
    const { userId } = req.params

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 })

    res.json(interviews)
  } catch (error) {
    res.status(500).json({ message: "Error fetching user interviews" })
  }
}