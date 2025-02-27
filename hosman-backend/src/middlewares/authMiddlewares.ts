import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Session from "../models/session";
import multer from "multer"; 

const SECRET_KEY = "112eryt33";

// Extend Request type to include `user`
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

const upload = multer({dest:"uploads/"})

// Middleware: Check if user session is active
export const checkSession = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.authToken;

    console.log("Token received:", token);

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; email: string; role?: string };
    console.log("Decoded token:", decoded);

    if (!decoded || !decoded.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Check if the session is active
    const session = await Session.findOne({ userId: decoded.id, token, isActive: true });

    console.log("Session found:", session);

    if (!session) {
      res.status(401).json({ message: "Session expired. Please log in again." });
      return;
    }

    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    console.log("User set on req:", req.user);

    next(); // ✅ Continue if authenticated
  } catch (error) {
    console.log("Authentication failed:", error);
    res.status(401).json({ message: "Authentication failed", error });
  }
};

