import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema(
  {
    interviewId: String,
    userId: String,
    totalScore: Number,
    categoryScores: Object,
    strengths: [String],
    areasForImprovement: [String],
    finalAssessment: String
  },
  { timestamps: true }
)

export default mongoose.model("Feedback", feedbackSchema)