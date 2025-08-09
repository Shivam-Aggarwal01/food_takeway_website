import jwt from "jsonwebtoken";

const authmiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader); // Debug log
    
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
    
    // Handle both "Bearer token" and direct token formats
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    console.log("Extracted token:", token.substring(0, 20) + "..."); // Debug log
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user ID:", decoded.id); // Debug log
        
        // Ensure req.body exists before setting properties
        if (!req.body) {
            req.body = {};
        }
        if (!req.query) {
            req.query = {};
        }
        
        req.body.userId = decoded.id;
        req.query.userId = decoded.id;
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.error("JWT verification error:", error.message, "Token:", token.substring(0, 20) + "...");
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

export default authmiddleware;
