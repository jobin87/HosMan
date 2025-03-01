"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appointmentSchema = new mongoose_1.default.Schema({
    department: {
        type: String,
        required: true,
    },
    doctorName: {
        type: String,
        required: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    appointmentTime: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});
// Create a model from the schema
const AppointmentModel = mongoose_1.default.model('Appointment', appointmentSchema);
exports.default = AppointmentModel;
