import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" })

    const exists = await User.findOne({ email })
    if (exists)
      return res.status(400).json({ success: false, message: "Email already registered" })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })

    const token = generateToken(user._id)
    res.cookie("token", token, cookieOptions)

    res.status(201).json({
      success: true,
      user: { _id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" })

    const user = await User.findOne({ email })
    if (!user)
      return res.status(401).json({ success: false, message: "Invalid email or password" })

    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return res.status(401).json({ success: false, message: "Invalid email or password" })

    const token = generateToken(user._id)
    res.cookie("token", token, cookieOptions)

    res.json({
      success: true,
      user: { _id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// POST /api/auth/logout
export const logoutUser = (req, res) => {
  res.clearCookie("token")
  res.json({ success: true, message: "Logged out" })
}

// GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" })
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" })
  }
}