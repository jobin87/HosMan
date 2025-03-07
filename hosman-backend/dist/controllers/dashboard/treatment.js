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
exports.updateTreatment = exports.deleteAllTreatments = exports.deleteTreatmentById = exports.getTreatment = exports.treatementAdded = void 0;
const SECRET_KEY = "112eryt33";
const treatment_1 = __importDefault(require("../../models/dashboard/treatment"));
const mongoose_1 = __importDefault(require("mongoose"));
const __1 = require("../..");
const treatementAdded = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { treatment, specialization, department, price, id } = req.body;
        // ✅ Correct check for duplicate treatments
        const existingTreatment = yield treatment_1.default.findOne({
            treatment, specialization, department
        });
        if (existingTreatment) {
            res.status(400).json({ message: "Treatment already registered", success: false });
            return;
        }
        const newTreatment = new treatment_1.default({ treatment, specialization, department, price, id });
        yield newTreatment.save();
        (0, __1.notifyTreatmentUpdate)();
        res.status(201).json({
            message: "Treatment added successfully",
            Treatment: newTreatment,
            success: true,
            treatmentAdded: true
        });
        return;
    }
    catch (error) {
        console.error("Error adding treatment:", error);
        res.status(500).json({ message: "Internal server error", success: false, error });
    }
});
exports.treatementAdded = treatementAdded;
const getTreatment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Use query params instead of body for GET requests
        // If `doctorRegId` is provided, fetch specific doctor; otherwise, return all doctors
        if (id) {
            const existingDepartment = yield treatment_1.default.findById(id);
            if (existingDepartment) {
                res.status(200).json({
                    message: "Doctor found",
                    doctor: existingDepartment
                });
            }
            else {
                res.status(405).json({ message: "treatment not found" });
            }
        }
        else {
            // If no `patientRegId` provided, return all doctors
            const treatmentData = yield treatment_1.default.find();
            res.status(200).json({
                message: "All treatment fetched successfully",
                treatmentData
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getTreatment = getTreatment;
// Delete a single treatment by ID
const deleteTreatmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTreatment = yield treatment_1.default.findByIdAndDelete(id);
        if (!deletedTreatment) {
            res.status(404).json({ message: 'Treatment not found' });
        }
        res.status(200).json({ message: 'Treatment deleted successfully', treatmentDeletedBYID: true });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting treatment', error });
    }
});
exports.deleteTreatmentById = deleteTreatmentById;
// Handler to delete all treatments
const deleteAllTreatments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete all treatments
        const result = yield treatment_1.default.deleteMany({});
        // Check if any treatments were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All treatments have been deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'No treatments found to delete' });
        }
    }
    catch (error) {
        console.error("Error deleting treatments:", error);
        res.status(500).json({ message: 'Error deleting treatments' });
    }
});
exports.deleteAllTreatments = deleteAllTreatments;
const updateTreatment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { treatmentId } = req.params;
    // Log the received ID for debugging
    console.log("Received treatmentId:", treatmentId);
    // Validate treatmentId format using Mongoose's ObjectId validator
    if (!mongoose_1.default.Types.ObjectId.isValid(treatmentId)) {
        console.log("Invalid treatmentId format:", treatmentId);
        res.status(400).json({ message: "Invalid treatment ID format" });
        return;
    }
    // Retrieve the fields to update from the request body
    const updateFields = req.body;
    try {
        // Find and update the treatment using the provided treatmentId
        const updatedTreatment = yield treatment_1.default.findByIdAndUpdate(treatmentId, { $set: updateFields }, { new: true });
        // Check if the treatment was found and updated
        if (!updatedTreatment) {
            res.status(404).json({ message: 'Treatment not found' });
            return;
        }
        // Successfully updated treatment, return the updated treatment data
        res.status(200).json({ treatmentData: updatedTreatment });
    }
    catch (error) {
        console.error("Error updating treatment:", error);
        res.status(500).json({ message: 'Error updating treatment' });
    }
});
exports.updateTreatment = updateTreatment;
