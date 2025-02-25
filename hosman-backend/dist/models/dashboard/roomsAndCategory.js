"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roomAndCategorySchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
    },
    roomNo: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });
const RoomAndCategory = mongoose_1.default.model('roomAndCategory', roomAndCategorySchema);
exports.default = RoomAndCategory;
