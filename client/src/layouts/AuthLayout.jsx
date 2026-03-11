import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const AuthLayout = ({ children }) => {
  const { user, loading } = useAuth()

  // Wait for session check before deciding where to go
  if (loading) return null

  // Already logged in → go to dashboard
  if (user) return <Navigate to="/" replace />

  return <div className="auth-layout">{children}</div>
}

export default AuthLayout