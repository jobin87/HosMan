"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const staffSchema = new mongoose_1.default.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    staffType: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    experience: {
        type: Number,
        required: true,
        min: 1,
    },
    contactNumber: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 999999999999999,
    },
    staffRegId: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
const StaffModel = mongoose_1.default.model("StaffModel", staffSchema);
exports.default = StaffModel;
