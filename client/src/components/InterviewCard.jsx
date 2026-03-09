import { Link } from "react-router-dom"
import dayjs from "dayjs"

import DisplayTechIcons from "./DisplayTechIcons"

const InterviewCard = ({
  interviewId,
  role,
  type,
  techstack,
  createdAt,
}) => {

  return (
    <div className="interview-card">

      <div className="flex justify-between items-center">

        <h3 className="capitalize">
          {role} Interview
        </h3>

        <p className="badge">
          {type}
        </p>

      </div>

      <DisplayTechIcons techStack={techstack} />

      <p className="text-sm text-gray-400 mt-2">
        {dayjs(createdAt).format("MMM D, YYYY")}
      </p>

      <Link
        to={`/interview/${interviewId}`}
        className="btn-primary mt-4 block text-center"
      >
        Start Interview
      </Link>

    </div>
  )
}

export default InterviewCard