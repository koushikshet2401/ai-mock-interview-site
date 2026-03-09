import Agent from "../components/Agent"

const CreateInterview = () => {
  const userId = localStorage.getItem("userId")
  const userName = localStorage.getItem("name")

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={userName}
        userId={userId}
        type="generate"
      />
    </>
  )
}

export default CreateInterview