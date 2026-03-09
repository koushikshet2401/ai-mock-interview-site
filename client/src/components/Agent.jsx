import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { cn } from "../utils/utils"
import API from "../services/api"

import { vapi } from "../utils/vapi"   // create this later if needed
import { interviewer } from "../constants"

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}) => {

  const navigate = useNavigate()

  const [callStatus, setCallStatus] = useState("INACTIVE")
  const [messages, setMessages] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [lastMessage, setLastMessage] = useState("")

  useEffect(() => {

    const onCallStart = () => setCallStatus("ACTIVE")
    const onCallEnd = () => setCallStatus("FINISHED")

    const onMessage = (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [...prev, newMessage])
      }
    }

    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnd)
    vapi.on("message", onMessage)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnd)
      vapi.off("message", onMessage)
    }

  }, [])

  useEffect(() => {

    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content)
    }

    const generateFeedback = async () => {

      try {

        const res = await API.post("/interview/feedback", {
          interviewId,
          userId,
          transcript: messages,
          feedbackId
        })

        if (res.data.success) {
          navigate(`/interview/${interviewId}/feedback`)
        }

      } catch (err) {
        console.error(err)
        navigate("/")
      }
    }

    if (callStatus === "FINISHED") {

      if (type === "generate") {
        navigate("/")
      } else {
        generateFeedback()
      }

    }

  }, [messages, callStatus])

  const handleCall = async () => {

    setCallStatus("CONNECTING")

    if (type === "generate") {

      await vapi.start(import.meta.env.VITE_VAPI_WORKFLOW_ID, {
        variableValues: {
          username: userName,
          userid: userId,
        }
      })

    } else {

      const formattedQuestions = questions?.map(q => `- ${q}`).join("\n")

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions
        }
      })
    }

  }

  const handleDisconnect = () => {
    setCallStatus("FINISHED")
    vapi.stop()
  }

  return (
    <>
      <div className="call-view">

        <div className="card-interviewer">
          <img src="/ai-avatar.png" width="65" />

          {isSpeaking && <span className="animate-speak"/>}

          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <img src="/user-avatar.png" className="size-[120px]"/>
            <h3>{userName}</h3>
          </div>
        </div>

      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p className="animate-fadeIn">{lastMessage}</p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">

        {callStatus !== "ACTIVE" ? (
          <button className="btn-call" onClick={handleCall}>
            {callStatus === "INACTIVE" ? "Call" : "..."}
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}

      </div>
    </>
  )
}

export default Agent