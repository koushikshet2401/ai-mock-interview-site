import dotenv from "dotenv"
dotenv.config()

import Groq from "groq-sdk"
import Interview from "../models/interview.js"
import { getRandomInterviewCover } from "../utils/getRandomInterviewCover.js"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export const generateInterview = async (req, res) => {
  const { type, role, level, techstack, amount, userid } = req.body

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "user",
          content: `
Prepare questions for a job interview.

Role: ${role}
Experience Level: ${level}
Tech Stack: ${techstack}
Focus: ${type}
Number of questions: ${amount}

Return ONLY questions formatted like:
["Question 1", "Question 2", "Question 3"]

Do not include extra text.
Do not use special characters like / or *.
`
        }
      ]
    })

    const questionsText = completion.choices[0].message.content

    const interview = await Interview.create({
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questionsText),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover()
    })

    res.json({
      success: true,
      interviewId: interview._id
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: "AI generation failed"
    })
  }
}