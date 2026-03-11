import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const RootLayout = ({ children }) => {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  // Wait for session check before deciding where to go
  if (loading) return null

  // Not logged in → go to signup
  if (!user) return <Navigate to="/sign-up" replace />

  const handleLogout = async () => {
    await logout()
    navigate("/sign-in")
  }

  return (
    <div className="root-layout">
      <nav>
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" width="38" height="32" alt="PrepWise" />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>

        <button onClick={handleLogout} className="logout-btn">
          Sign Out
        </button>
      </nav>

      {children}
    </div>
  )
}

export default RootLayout