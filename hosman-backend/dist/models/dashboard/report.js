"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reportSchema = new mongoose_1.default.Schema({
    reportId: {
        type: String,
        required: true,
        unique: true, // Ensures each report has a unique ID
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    roomNo: {
        type: String,
        required: true,
        trim: true,
    },
    assignedWorker: {
        type: String,
        default: null, // Initially no worker assigned
        trim: true,
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    dateReported: {
        type: Date,
        default: Date.now, // Automatically sets the date when a report is created
    },
}, { timestamps: true } // Adds createdAt and updatedAt fields automatically
);
const ReportModel = mongoose_1.default.model("Report", reportSchema);
exports.default = ReportModel;
