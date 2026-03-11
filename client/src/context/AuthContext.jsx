import { createContext, useContext, useState, useEffect } from "react"
import API from "../services/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // On mount, check if there's an active session (cookie)
    useEffect(() => {
        const init = async () => {
            try {
                const res = await API.get("/auth/me")
                if (res.data.success) {
                    setUser(res.data.user)
                    localStorage.setItem("userId", res.data.user._id)
                }
            } catch {
                setUser(null)
                localStorage.removeItem("userId")
            } finally {
                setLoading(false)
            }
        }
        init()
    }, [])

    const register = async (name, email, password) => {
        const res = await API.post("/auth/register", { name, email, password })
        return res.data
    }

    const login = async (email, password) => {
        const res = await API.post("/auth/login", { email, password })
        if (res.data.success) {
            setUser(res.data.user)
            localStorage.setItem("userId", res.data.user._id)
        }
        return res.data
    }

    const logout = async () => {
        await API.post("/auth/logout")
        setUser(null)
        localStorage.removeItem("userId")
    }

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
