import { Link, Navigate } from "react-router-dom"

const RootLayout = ({ children }) => {
  const userId = localStorage.getItem("userId")

  if (!userId) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="root-layout">

      <nav>
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" width="38" height="32" />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
      </nav>

      {children}

    </div>
  )
}

export default RootLayout