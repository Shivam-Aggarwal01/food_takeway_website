import Admin from "../models/Admin.model.js";
import jwt from "jsonwebtoken";
import validator from "validator";

// Helper: Create JWT for admin
const generateAdminToken = (adminId) => {
  return jwt.sign({ id: adminId, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Admin Login
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Basic validations
    if (!username || !password) {
      return res.status(400).json({ error: "Please provide both username and password." });
    }

    const trimmedUsername = username.trim().toLowerCase();

    const admin = await Admin.findOne({ username: trimmedUsername });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateAdminToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Create default admin (for first time setup)
export const createDefaultAdmin = async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists." });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    const newAdmin = new Admin({
      username: username.trim().toLowerCase(),
      password,
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Default admin created successfully",
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}; 