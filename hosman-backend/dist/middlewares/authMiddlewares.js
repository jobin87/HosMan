"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSession = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const session_1 = __importDefault(require("../models/session"));
const SECRET_KEY = "112eryt33";
const checkSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies.authToken;
        console.log("Token received:", token); // 🔍 Debugging
        if (!token) {
            console.log("No token provided");
            res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log("Decoded token:", decoded); // 🔍 Debugging
        if (!decoded || !decoded.id) {
            console.log("Invalid token structure");
            res.status(401).json({ message: "Invalid token" });
        }
        const session = yield session_1.default.findOne({ userId: decoded.id, token, isActive: true });
        console.log("Session found:", session); // 🔍 Debugging
        if (!session) {
            console.log("Session expired or not found");
            res.status(401).json({ message: "Session expired. Please log in again." });
        }
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
        console.log("User set on req:", req.user); // 🔍 Debugging
        next();
    }
    catch (error) {
        console.log("Authentication failed:", error);
        res.status(401).json({ message: "Authentication failed", error });
    }
});
exports.checkSession = checkSession;
