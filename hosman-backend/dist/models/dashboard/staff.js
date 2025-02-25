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
    },
    experience: {
        type: String,
        required: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },
    staffRegId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const StaffModel = mongoose_1.default.model('StaffModel', staffSchema);
exports.default = StaffModel;
