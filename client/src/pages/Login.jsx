import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

const Login = () => {

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await API.post("/auth/login",{
        email,
        password
      })

      localStorage.setItem("token",res.data.token)
      localStorage.setItem("userId",res.data.user._id)

      navigate("/")

    } catch(err) {
      alert("Login failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">

        <h2 className="text-2xl font-bold">Login</h2>

        <input
          type="email"
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
          Login
        </button>

      </form>

    </div>
  )
}

export default Login