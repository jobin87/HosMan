"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const staffCreatingSchema = new mongoose_1.default.Schema({
    staffName: {
        type: String,
        required: true,
        trim: true,
    },
    staffPosition: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });
const StaffRoles = mongoose_1.default.model('staffcreated', staffCreatingSchema);
exports.default = StaffRoles;
