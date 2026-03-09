import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import dayjs from "dayjs"
import API from "../services/api"

const Feedback = () => {
  const { id } = useParams()
  const userId = localStorage.getItem("userId")

  const [interview, setInterview] = useState(null)
  const [feedback, setFeedback] = useState(null)

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

  if (!feedback) return <p>Loading...</p>

  return (
    <section className="section-feedback">
      <h1>
        Feedback - {interview?.role} Interview
      </h1>

      <p>
        Score: {feedback.totalScore}/100
      </p>

      <p>
        {dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")}
      </p>

      <p>{feedback.finalAssessment}</p>

      {feedback.categoryScores.map((category, index) => (
        <div key={index}>
          <p>
            {category.name} ({category.score}/100)
          </p>

          <p>{category.comment}</p>
        </div>
      ))}

      <h3>Strengths</h3>

      <ul>
        {feedback.strengths.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h3>Areas for Improvement</h3>

      <ul>
        {feedback.areasForImprovement.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <Link to="/">Back to dashboard</Link>
    </section>
  )
}

export default Feedback