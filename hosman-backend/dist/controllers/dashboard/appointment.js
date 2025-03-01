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
exports.getAppointments = exports.appointments = void 0;
const appointment_1 = __importDefault(require("../../models/dashboard/appointment"));
const appointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { department, doctorName, patientName, appointmentTime, appointmentDate, payment } = req.body;
        // Check for missing fields
        if (!department || !doctorName || !patientName || !appointmentTime || !appointmentDate || !payment) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        // Create and save the new appointment
        const newAppointment = new appointment_1.default({
            department,
            doctorName,
            patientName,
            appointmentTime,
            appointmentDate,
            payment,
        });
        console.log("New appointment object:", newAppointment);
        yield newAppointment.save();
        res.status(201).json({
            message: "Appointment booked successfully",
            appointment: newAppointment,
        });
    }
    catch (error) {
        console.error("Appointment creation error:", error);
        res.status(500).json({ message: "Internal server error while booking appointment" });
    }
});
exports.appointments = appointments;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all appointments from the database
        const appointments = yield appointment_1.default.find();
        // Log for debugging
        console.log("Retrieved appointments:", appointments);
        res.status(200).json({
            message: "Appointments retrieved successfully",
            appointments, // Return all appointments directly
        });
    }
    catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Internal server error while fetching appointment data" });
    }
});
exports.getAppointments = getAppointments;
