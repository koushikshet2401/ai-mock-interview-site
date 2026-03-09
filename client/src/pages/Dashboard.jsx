import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../services/api"
import InterviewCard from "../components/InterviewCard"

const Dashboard = () => {

  const [userInterviews, setUserInterviews] = useState([])
  const [allInterviews, setAllInterviews] = useState([])

  const userId = localStorage.getItem("userId")

  useEffect(() => {

    const fetchData = async () => {
      try {

        const userRes = await API.get(`/interview/user/${userId}`)
        const allRes = await API.get(`/interview/latest?userId=${userId}`)

        setUserInterviews(userRes.data)
        setAllInterviews(allRes.data)

      } catch (err) {
        console.log(err)
      }
    }

    if (userId) fetchData()

  }, [userId])

  return (
    <div className="p-8">

      <section className="card-cta flex justify-between items-center">

        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>

          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Link to="/interview">
            <button className="btn-primary">
              Start an Interview
            </button>
          </Link>
        </div>

        <img src="/robot.png" width="350" />

      </section>

      <section className="flex flex-col gap-6 mt-10">

        <h2>Your Interviews</h2>

        <div className="interviews-section">

          {userInterviews.length > 0 ? (
            userInterviews.map((interview) => (
              <InterviewCard
                key={interview._id}
                interviewId={interview._id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven't taken any interviews yet</p>
          )}

        </div>

      </section>

    </div>
  )
}

export default Dashboard