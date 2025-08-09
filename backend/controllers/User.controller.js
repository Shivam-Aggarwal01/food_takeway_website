import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

//  Helper: Create JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Register User
export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Basic validations
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "Please fill all the fields." });
    }

    // Trim whitespace
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    if (trimmedName.length < 2) {
      return res.status(400).json({ error: "Name must be at least 2 characters long." });
    }

    if (!validator.isEmail(trimmedEmail)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    // Validate American phone number format (XXX) XXX-XXXX or XXX-XXX-XXXX
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(trimmedPhone)) {
      return res.status(400).json({ error: "Please enter a valid American phone number (e.g., (555) 123-4567 or 555-123-4567)." });
    }

    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      phone: trimmedPhone,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        isVerified: newUser.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide both email and password." });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Refresh Token
export const refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    // Try to decode the token even if expired
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Generate new token
    const newToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      token: newToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};