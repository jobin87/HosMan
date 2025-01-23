import { Request, Response } from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import User from "../models/user";
import Session from "../models/session";
const SECRET_KEY = "112eryt33";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { promises } from "readline";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App Password
  },
});

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, role, userRegNum, userEmail, password, zipCode } =
      req.body;

    // Check if all fields are provided
    if (!userName || !userEmail || !password) {
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
    const existingUser = await User.findOne({ userEmail });
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

    if (!zipCode) {
      res.status(400).json({ success: false, message: "zipcode is required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create a new user and save it to the database
    const newUser = new User({
      userName,
      userEmail,
      password: hashedPassword,
      role: role,
      isVerified: false,
      userRegNum: userRegNum,
      zipCode: zipCode,
      verificationToken: verificationToken,
    });

    await newUser.save();

    const verificationUrl = `http://localhost:5001/api/auth/v1/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Verify Your Email",
      html: `
        <h2>Hello ${userName},</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Respond with the success message and token
    res.status(200).json({
      success: true,
      message:
        "Signup successful! Please check your email to verify your account.",
      userWithRoleRequested: true,
      verificationToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// Verify Email Function - Corrected
export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.query;

    if (!token) {
      res
        .status(400)
        .json({ success: false, message: "Verification token is missing" });
      return;
    }

    // Find user by the verification token
    const user = await User.findOne({ verificationToken: token });

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
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email successfully verified!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    console.log("Login Attempt:", email);

    // Check if user exists
    const existingUser = await User.findOne({ userEmail: email });
    console.log("existingUse:", existingUser);
    if (!existingUser) {
      console.log("User not found");
      res.status(400).json({ success: false, message: "Invalid email" });
      return;
    }

    if (!existingUser.isVerified) {
      console.log("User not verified");
      res.status(400).json({ success: false, message: "Email not verified" });
      return;
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("Password Match:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, message: "Incorrect password" });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.userEmail },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      userLogged: true,
      accessToken: token,
      id: existingUser._id,
      email: existingUser.userEmail,
      username: existingUser.userName,
      role: existingUser.role,
      photoURL:"https://i.pinimg.com/736x/3b/33/47/3b3347c6e29f5b364d7b671b6a799943.jpg"
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400).json({ success: false, message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    // Find and deactivate session
    const session = await Session.findOne({ token });
    console.log(session);
    if (!session) {
      res.status(404).json({ success: false, message: "Session not found" });
      return;
    }

    session.isActive = false;
    session.logoutTime = new Date();
    await session.save();

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Logout failed", error: error.message });
  }
};

// export const checkEmailExist = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email } = req.body;

//     // Check if email fields are provided
//     if (!email) {
//       res.status(400).json({ success: false, message: 'Email field is empty' });
//       return;
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       res.status(400).json({ success: false, message: 'Invalid email format' });
//       return;
//     }

//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       res.status(400).json({ success: false, message: 'User exists with this email so login with that' });
//       return;
//     }

//     // If email is available, send success response
//     res.status(200).json({ success: true, message: 'Email is available move to sign in' });

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal Server Error', error });
//   }
// };

// export const login = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email});
//     if (!user) {
//       res.status(400).json({ success: false, message: 'Invalid email or password' });
//       return;
//     }

//     // Compare the password with the hashed password
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       res.status(400).json({ success: false, message: 'Invalid email or password' });
//       return;
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || SECRET_KEY, { expiresIn: '1h' });

//     // Fetch movies from JSON file
//     const filepath = path.join(__dirname, "../../contentjson/content.json");
//     const fileData = fs.readFileSync(filepath, "utf-8");
//     const movieData = JSON.parse(fileData);

//     // Filter movies and series
//     const movies = movieData.filter((item: any) => item.Type === "movie");
//     const series = movieData.filter((item: any) => item.Type === "series");
//     const anime = movieData.filter((item: any) => item.Type === "anime");

//     res.cookie('authToken', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 1000,
//     });

//     // Respond with the success message and token
//     res.status(200).json({
//       success: true,
//       token,
//       user: { id: user._id, email: user.email , username: user.username },
//       movies,
//       series,
//       anime,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal Server Error', error });
//   }
// };

// export const logout = async (req: Request, res: Response): Promise<void> => {
//   try {
//     res.clearCookie('authToken'); // Clear the cookie on logout
//     res.status(200).json({ LoggedOut: true, message: 'Logout successful' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Retrieve all users from the database
//     const users = await User.find();

//     res.status(200).json({
//       success: true,
//       message: 'Users retrieved successfully',
//       users,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal Server Error', error });
//   }
// };

// export const deleteuser = async (req: Request, res: Response): Promise<void> => {
//   const { email } = req.params;
//   try {
//     console.log(`User with email ${email} is deleting`);

//     // Find and delete the user by email
//     const deleteduser = await User.findOneAndDelete({ email });

//     if (!deleteduser) {
//       // User not found
//       res.status(404).json({ success: false, message: 'User not found' });
//       return;
//     }

//     // Successfully deleted user
//     res.status(200).json({ success: true, message: 'User deleted successfully' });
//   } catch (error) {
//     // Handle unexpected errors
//     res.status(500).json({ success: false, message: 'An error occurred while deleting the user', error });
//   }
// };
