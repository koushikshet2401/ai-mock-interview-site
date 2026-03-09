import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Agent from "../components/Agent"
import DisplayTechIcons from "../components/DisplayTechIcons"
import { getRandomInterviewCover } from "../utils/utils"
import API from "../services/api"

const Interview = () => {
  const { id } = useParams()

  const [interview, setInterview] = useState(null)
  const [feedback, setFeedback] = useState(null)

  const userId = localStorage.getItem("userId")
  const userName = localStorage.getItem("name")

  useEffect(() => {
    const fetchData = async () => {
      const interviewRes = await API.get(`/interview/${id}`)

      const feedbackRes = await API.get(
        `/interview/feedback/interview?interviewId=${id}&userId=${userId}`
      )

      setInterview(interviewRes.data)
      setFeedback(feedbackRes.data)
    }

    fetchData()
  }, [id, userId])

  if (!interview) return <p>Loading...</p>

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center">
          <img
            src={getRandomInterviewCover()}
            alt="cover"
            width={40}
          />

          <h3 className="capitalize">
            {interview.role} Interview
          </h3>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={userName}
        userId={userId}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?._id}
      />
    </>
  )
}

export default Interview