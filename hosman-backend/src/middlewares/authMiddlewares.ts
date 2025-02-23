import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Session from "../models/session";

const SECRET_KEY = "112eryt33";

// Extend Request type
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

export const checkSession = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.authToken;

    console.log("Token received:", token); // 🔍 Debugging

    if (!token) {
      console.log("No token provided");
       res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded: any = jwt.verify(token, SECRET_KEY);
    console.log("Decoded token:", decoded); // 🔍 Debugging

    if (!decoded || !decoded.id) {
      console.log("Invalid token structure");
       res.status(401).json({ message: "Invalid token" });
    }

    const session = await Session.findOne({ userId: decoded.id, token, isActive: true });

    console.log("Session found:", session); // 🔍 Debugging

    if (!session) {
      console.log("Session expired or not found");
       res.status(401).json({ message: "Session expired. Please log in again." });
    }

    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    console.log("User set on req:", req.user); // 🔍 Debugging

    next();
  } catch (error) {
    console.log("Authentication failed:", error);
     res.status(401).json({ message: "Authentication failed", error });
  }
};
