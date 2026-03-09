import mongoose from "mongoose"

const interviewSchema = new mongoose.Schema(
  {
    userId: String,
    role: String,
    techStack: [String],
    questions: [String],
    finalized: Boolean
  },
  { timestamps: true }
)

export default mongoose.model("Interview", interviewSchema)