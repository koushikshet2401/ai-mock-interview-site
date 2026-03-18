import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"

import { AuthProvider } from "./context/AuthContext"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateInterview from "./pages/CreateInterview"
import Interview from "./pages/Interview"
import Feedback from "./pages/Feedback"

import AuthLayout from "./layouts/AuthLayout"
import RootLayout from "./layouts/RootLayout"
import "./index.css"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>

          {/* Default → Signup */}
          <Route path="/" element={
            <RootLayout>
              <Dashboard />
            </RootLayout>
          } />

          {/* Auth pages */}
          <Route path="/sign-up" element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          } />

          <Route path="/sign-in" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />

          {/* Protected app pages */}
          <Route path="/interview" element={
            <RootLayout>
              <CreateInterview />
            </RootLayout>
          } />

          <Route path="/interview/:id" element={
            <RootLayout>
              <Interview />
            </RootLayout>
          } />

          <Route path="/interview/:id/feedback" element={
            <RootLayout>
              <Feedback />
            </RootLayout>
          } />

          {/* Legacy redirects */}
          <Route path="/login" element={<Navigate to="/sign-in" replace />} />
          <Route path="/register" element={<Navigate to="/sign-up" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App