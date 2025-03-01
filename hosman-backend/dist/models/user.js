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
        type: [String], // Change from a single string to an array of strings
        default: [],
    },
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
