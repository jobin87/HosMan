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
exports.getPatient = exports.PatientAdded = void 0;
const SECRET_KEY = "112eryt33";
const patient_1 = __importDefault(require("../../models/dashboard/patient"));
const __1 = require("../..");
const PatientAdded = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientName, contactNumber, disease, age, patientRegId } = req.body;
        const existingPatient = yield patient_1.default.findOne({ patientRegId });
        if (existingPatient) {
            res.status(400).json({ message: "Patient already registered" });
            return;
        }
        const newPatient = new patient_1.default({ patientName, patientRegId, disease, age, contactNumber });
        yield newPatient.save();
        (0, __1.notifyPatientUpdate)();
        res.status(201).json({ message: "Patient added successfully", patient: newPatient, patientAdded: true });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.PatientAdded = PatientAdded;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientRegId } = req.body; // Use query params instead of body for GET requests
        // If `doctorRegId` is provided, fetch specific doctor; otherwise, return all doctors
        if (patientRegId) {
            const existingPatient = yield patient_1.default.findOne({ patientRegId });
            if (existingPatient) {
                res.status(200).json({
                    message: "Doctor found",
                    doctor: existingPatient
                });
            }
            else {
                res.status(405).json({ message: "patient not found" });
            }
        }
        else {
            // If no `patientRegId` provided, return all doctors
            const patientsdata = yield patient_1.default.find();
            res.status(200).json({
                message: "All patients fetched successfully",
                patientsdata
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getPatient = getPatient;
