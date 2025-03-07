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
exports.sessions = exports.logout = exports.upload = exports.updateProfile = exports.login = exports.verifyEmail = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const session_1 = __importDefault(require("../models/session"));
const SECRET_KEY = "112eryt33";
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sessionController_1 = require("./sessionController");
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // App Password
    },
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // ✅ Store in "uploads" folder
    },
    filename: (req, file, cb) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // ✅ Get user ID from authentication
        if (!userId) {
            return cb(new Error("User ID is required"), "default-image.jpg");
        }
        cb(null, `${userId}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, role, userRegNum, specialization, userEmail, password, zipCode, department } = req.body;
        // Check if all fields are provided
        if (!userName || !userEmail || !password || !department) {
            res
                .status(400)
                .json({ success: false, message: "All fields are required" });
            return;
        }
        if (!userEmail || userEmail.trim() === "") {
            throw new Error("Email is required.");
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            res.status(400).json({ success: false, message: "Invalid email format" });
            return;
        }
        // Validate password length
        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters not more than ",
            });
            return;
        }
        // Check if the email already exists
        const existingUser = yield user_1.default.findOne({ userEmail });
        if (existingUser) {
            res
                .status(400)
                .json({ success: false, message: "User exists with this email" });
            return;
        }
        if (!userName) {
            res.status(400).json({ success: false, message: "Username is required" });
            return;
        }
        if (!userRegNum) {
            res
                .status(400)
                .json({ success: false, message: "regNumber is required" });
        }
        if (!specialization) {
            res
                .status(400)
                .json({ success: false, message: "specialization is required" });
        }
        if (!zipCode) {
            res.status(400).json({ success: false, message: "zipcode is required" });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
        // Create a new user and save it to the database
        const newUser = new user_1.default({
            userName,
            userEmail,
            specialization,
            department,
            password: hashedPassword,
            role: role,
            isVerified: false,
            userRegNum: userRegNum,
            zipCode: zipCode,
            verificationToken: verificationToken,
        });
        yield newUser.save();
        const verificationUrl = `https://hosman-backend-sdne.onrender.com/api/auth/v1/verify-email?token=${verificationToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Verify Your Email",
            html: `
        <h2>Hello ${userName},</h2>
        <p>Thank you for registering with us!</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        
        <h3>Account Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${userName}</li>
          <li><strong>Email:</strong> ${userEmail}</li>
        </ul>
    
        <p>If you did not sign up, please ignore this email.</p>
      `,
        };
        yield transporter.sendMail(mailOptions);
        // Respond with the success message and token
        res.status(200).json({
            success: true,
            message: "Signup successful! Please check your email to verify your account.",
            userWithRoleRequested: true,
            verificationToken,
            photoURL: "https://i.pinimg.com/736x/3b/33/47/3b3347c6e29f5b364d7b671b6a799943.jpg",
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error", error });
    }
});
exports.signup = signup;
// Verify Email Function - Corrected
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token) {
            res
                .status(400)
                .json({ success: false, message: "Verification token is missing" });
            return;
        }
        // Find user by the verification token
        const user = yield user_1.default.findOne({ verificationToken: token });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid or expired verification token",
            });
            return;
        }
        // Update user to verified
        user.isVerified = true;
        user.verificationToken = ""; // Clear the token
        yield user.save();
        res
            .status(200)
            .json({ success: true, message: "Email successfully verified!" });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error", error });
    }
});
exports.verifyEmail = verifyEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userAgent = req.headers["user-agent"] || "Unknown Device";
        const userIP = req.ip || "Unknown IP";
        console.log("Login Attempt:", email);
        // Check if user exists
        const existingUser = yield user_1.default.findOne({ userEmail: email });
        if (!existingUser) {
            res.status(400).json({ success: false, message: "Invalid email" });
            return;
        }
        if (!existingUser.isVerified) {
            res.status(400).json({ success: false, message: "Email not verified" });
            return;
        }
        // Validate password
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ success: false, message: "Incorrect password" });
            return;
        }
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id, email: existingUser.userEmail }, SECRET_KEY, { expiresIn: "1h" });
        // 🔍 **Find an existing session with the same user & same browser (user-agent)**
        let existingSession = yield session_1.default.findOne({
            userId: existingUser._id,
            deviceId: userAgent,
            isActive: false, // Only check for inactive sessions
        });
        if (existingSession) {
            // ✅ **Reuse the existing session** instead of creating a new one
            existingSession.token = token;
            existingSession.ipAddress = userIP;
            existingSession.isActive = true;
            existingSession.loginTime = new Date();
            existingSession.logoutTime = null;
            yield existingSession.save();
        }
        else {
            // ❗ No inactive session found → **Create a new session**
            yield session_1.default.create({
                userId: existingUser._id,
                token,
                userName: existingUser.userName,
                department: existingUser.department,
                specialization: existingUser.specialization,
                role: existingUser.role,
                deviceId: userAgent,
                ipAddress: userIP,
                isActive: true,
                loginTime: new Date(),
            });
        }
        (0, sessionController_1.notifySessionUpdate)(req.app.locals.io);
        // Set authentication cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour expiration
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            userLogged: true,
            accessToken: token,
            id: existingUser._id,
            email: existingUser.userEmail,
            username: existingUser.userName,
            role: existingUser.role,
            photoURL: "https://i.pinimg.com/736x/3b/33/47/3b3347c6e29f5b364d7b671b6a799943.jpg",
        });
    }
    catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.login = login;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Ensure `req.user` is set by the authentication middleware
        if (!req.user || !req.user.id) {
            res.status(401).json({ success: false, message: "Unauthorized access" });
            return;
        }
        const userId = req.user.id; // ✅ Get user ID from authenticated request
        // ✅ Ensure a file was uploaded
        if (!req.file) {
            res.status(400).json({ success: false, message: "No image uploaded" });
            return;
        }
        const newImageUrl = `/uploads/${req.file.filename}`;
        // ✅ Find the user and update their profile image
        const user = yield user_1.default.findByIdAndUpdate(userId, { photoURL: newImageUrl }, { new: true });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.json({
            success: true,
            message: "Profile image updated successfully",
            photoURL: user.photoURL,
        });
    }
    catch (error) {
        console.error("Error updating profile image:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.updateProfile = updateProfile;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : req.cookies.authToken;
        if (!token) {
            res.status(400).json({ success: false, message: "No token provided" });
            return;
        }
        // Find the session with this token
        const session = yield session_1.default.findOne({ token });
        if (session) {
            // Mark the session as inactive, but keep the role
            yield session_1.default.updateOne({ _id: session._id }, { isActive: false, logoutTime: new Date() });
        }
        // Clear the auth cookie
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        (0, sessionController_1.notifySessionUpdate)(req.app.locals.io);
        res.status(200).json({ success: true, message: "Logout successful", loggedOut: true });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Logout failed", error: error.message });
    }
});
exports.logout = logout;
const sessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const loggedInUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Get the logged-in user ID from authentication middleware
        // ✅ Fetch all doctors (active & inactive)
        const uniqueDoctors = yield session_1.default.aggregate([
            { $match: { role: "Doctor" } }, // Get only doctors (both active & inactive)
            { $sort: { loginTime: -1 } }, // Sort by latest login time (most recent first)
            {
                $group: {
                    _id: "$userId", // Group by userId to keep only the latest session per doctor
                    userId: { $first: "$userId" },
                    userName: { $first: "$userName" },
                    department: { $first: "$department" },
                    specialization: { $first: "$specialization" },
                    isActive: { $first: "$isActive" },
                    loginTime: { $first: "$loginTime" } // Keep the latest login time
                },
            },
            { $sort: { loginTime: -1 } } // Sort again by latest login time
        ]);
        // ✅ Remove the logged-in user from the list
        const filteredDoctors = uniqueDoctors.filter(doctor => doctor.userId !== loggedInUserId);
        if (filteredDoctors.length === 0) {
            res.status(404).json({ success: false, message: "No doctors found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Doctors retrieved successfully",
            doctors: filteredDoctors // ✅ All doctors (excluding logged-in user)
        });
    }
    catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
});
exports.sessions = sessions;
