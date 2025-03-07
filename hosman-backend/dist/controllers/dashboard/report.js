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
exports.AssignWorkers = exports.getReports = exports.AddReports = void 0;
const uuid_1 = require("uuid");
const report_1 = __importDefault(require("../../models/dashboard/report"));
const mongoose_1 = __importDefault(require("mongoose"));
const __1 = require("../..");
const AddReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, category, roomNo } = req.body;
        if (!description || !category || !roomNo) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const reportId = `RPT-${(0, uuid_1.v4)()}`;
        const dateReported = new Date().toISOString();
        const newReport = new report_1.default({
            reportId: reportId,
            description,
            category,
            roomNo,
            dateReported,
            isAssigned: false, // ✅ Default value when a report is created
        });
        yield newReport.save();
        (0, __1.notifyReportsUpdate)();
        res.status(201).json({ message: "Report added successfully", reportId: reportId, newReport });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Report ID already exists." });
        }
        else {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
});
exports.AddReports = AddReports;
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reportId } = req.query;
        if (reportId) {
            const existingReport = yield report_1.default.findById(reportId);
            if (existingReport) {
                res.status(200).json({ message: "Report found", report: existingReport });
            }
            else {
                res.status(404).json({ message: "Report not found" });
            }
        }
        else {
            // ✅ Step 1: Sort reports globally by createdAt (ascending)
            const reportdata = yield report_1.default.aggregate([
                { $sort: { createdAt: 1 } }, // Oldest reports first
                {
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 },
                        reports: { $push: "$$ROOT" }, // Maintain createdAt order within category
                    },
                },
                { $sort: { "_id": 1 } } // ✅ Ensure categories appear in a consistent order
            ]);
            res.status(200).json({ message: "All reports fetched successfully", reportdata });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getReports = getReports;
const AssignWorkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reportId, assignedWorker } = req.body;
        console.log("🔍 Received Request - Report ID:", reportId, "Worker:", assignedWorker);
        if (!reportId) {
            res.status(400).json({ message: "reportId is required" });
            return;
        }
        // ✅ Convert `reportId` to ObjectId to match MongoDB `_id`
        const objectId = new mongoose_1.default.Types.ObjectId(reportId);
        // ✅ Find by `_id` instead of `reportId`
        const existingReport = yield report_1.default.findById(objectId);
        if (!existingReport) {
            console.log("❌ Report not found for ID:", reportId);
            res.status(404).json({ message: "Report not found" });
            return;
        }
        // ✅ Update assigned worker & isAssigned status
        const updatedReport = yield report_1.default.findByIdAndUpdate(objectId, { $set: { assignedWorker, isAssigned: !!assignedWorker } }, { new: true });
        console.log("✅ Worker Assigned Successfully:", updatedReport);
        res.status(200).json({ message: "Worker assigned successfully", updatedReport });
    }
    catch (error) {
        console.error("❌ Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.AssignWorkers = AssignWorkers;
