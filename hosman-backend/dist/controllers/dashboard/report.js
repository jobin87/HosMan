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
exports.getReports = exports.AddReports = void 0;
const uuid_1 = require("uuid");
const report_1 = __importDefault(require("../../models/dashboard/report"));
const AddReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, category, roomNo } = req.body;
        if (!description || !category || !roomNo) {
            res.status(400).json({ message: 'All fields are required' });
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
        });
        yield newReport.save();
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
        // If a specific reportId is provided, fetch the report by that ID
        if (reportId) {
            const existingReport = yield report_1.default.findOne({ reportId });
            if (existingReport) {
                res.status(200).json({
                    message: "Report found",
                    report: existingReport,
                });
            }
            else {
                res.status(404).json({ message: "Report not found" });
            }
        }
        else {
            // If no specific reportId is provided, fetch all reports and group by category
            const reportdata = yield report_1.default.aggregate([
                {
                    $group: {
                        _id: "$category", // Group by category field
                        count: { $sum: 1 }, // Count the number of reports per category
                        reports: { $push: "$$ROOT" }, // Push all reports under each category
                    },
                },
                {
                    $sort: { count: -1 }, // Optional: Sort categories by the count (descending)
                },
            ]);
            res.status(200).json({
                message: "All reports fetched successfully",
                reportdata,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getReports = getReports;
