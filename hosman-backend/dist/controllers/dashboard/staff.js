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
exports.getStaff = exports.addStaff = void 0;
const staff_1 = __importDefault(require("../../models/dashboard/staff"));
const __1 = require("../..");
const addStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, staffType, department, experience, contactNumber, staffRegId } = req.body;
        const existingStaff = yield staff_1.default.findOne({ staffRegId });
        if (existingStaff) {
            res.status(400).json({ message: "Staff already registered" });
        }
        else {
            const newStaff = new staff_1.default({ Name, staffType, department, experience, contactNumber, staffRegId });
            yield newStaff.save();
            (0, __1.notifyStaffUpdate)();
            res.status(201).json({ message: "Staff added successfully", staff: newStaff });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.addStaff = addStaff;
const getStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staffData = yield staff_1.default.find();
        console.log("Fetched staff data:", staffData);
        if (staffData.length === 0) {
            res.status(404).json({ message: "No staff found" });
            return;
        }
        // Group staff by staffType
        const groupedStaff = staffData.reduce((acc, staff) => {
            const { staffType } = staff;
            if (!acc[staffType]) {
                acc[staffType] = [];
            }
            acc[staffType].push(staff);
            return acc;
        }, {});
        console.log("Grouped staff data:", JSON.stringify(groupedStaff, null, 2));
        res.status(200).json({
            message: "Staff grouped by staff type",
            groupedStaff,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getStaff = getStaff;
