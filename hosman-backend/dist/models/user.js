"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Prevent duplicate emails
    },
    password: {
        type: String,
        required: true,
    },
    userRegNum: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    specialization: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['Manager', 'Doctor', 'Nurse'],
        required: true
    },
    zipCode: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String, // <-- Add this field
    },
    photoURL: {
        type: String,
        default: "https://i.pinimg.com/736x/3b/33/47/3b3347c6e29f5b364d7b671b6a799943.jpg", // ✅ Default profile image
    },
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
