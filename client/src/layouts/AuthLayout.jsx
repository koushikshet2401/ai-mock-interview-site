import { Navigate } from "react-router-dom"

const AuthLayout = ({ children }) => {
  const userId = localStorage.getItem("userId")

  if (userId) {
    return <Navigate to="/" replace />
  }

  return <div className="auth-layout">{children}</div>
}

export default AuthLayout