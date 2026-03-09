import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateInterview from "./pages/CreateInterview"
import Interview from "./pages/Interview"
import Feedback from "./pages/Feedback"

import AuthLayout from "./layouts/AuthLayout"
import RootLayout from "./layouts/RootLayout"

import "./index.css"

function App() {
  return (
<BrowserRouter>
  <Routes>

    <Route
      path="/login"
      element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      }
    />

    <Route
      path="/register"
      element={
        <AuthLayout>
          <Register />
        </AuthLayout>
      }
    />

    <Route
      path="/"
      element={
        <RootLayout>
          <Dashboard />
        </RootLayout>
      }
    />

    <Route
      path="/interview"
      element={
        <RootLayout>
          <CreateInterview />
        </RootLayout>
      }
    />

    <Route
      path="/interview/:id"
      element={
        <RootLayout>
          <Interview />
        </RootLayout>
      }
    />

    <Route
      path="/interview/:id/feedback"
      element={
        <RootLayout>
          <Feedback />
        </RootLayout>
      }
    />

  </Routes>
</BrowserRouter>
  )
}

export default App