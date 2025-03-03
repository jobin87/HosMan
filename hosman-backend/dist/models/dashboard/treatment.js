"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const treatmentSchema = new mongoose_1.default.Schema({
    department: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    treatment: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});
// Create a model from the schema
const Treatment = mongoose_1.default.model('Treatment', treatmentSchema);
exports.default = Treatment;
