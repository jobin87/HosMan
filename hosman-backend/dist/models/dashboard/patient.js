"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const patientSchema = new mongoose_1.default.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },
    disease: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: String,
        required: true,
        trim: true,
    },
    patientRegId: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Distcharged'],
        default: 'Active',
        required: false,
    },
}, { timestamps: true });
const Patient = mongoose_1.default.model('addPatient', patientSchema);
exports.default = Patient;
