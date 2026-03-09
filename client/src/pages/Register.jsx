import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const Register = () => {

  const navigate = useNavigate()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await API.post("/auth/register",{
        name,
        email,
        password
      })

      navigate("/login")

    } catch(err) {
      alert("Registration failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">

        <h2 className="text-2xl font-bold">Register</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2"
        />

        <button className="bg-black text-white p-2">
          Register
        </button>

      </form>

    </div>
  )
}

export default Register