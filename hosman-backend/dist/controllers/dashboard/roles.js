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
exports.getRoomsAndCategories = exports.AddroomsAndCategories = void 0;
const roomsAndCategory_1 = __importDefault(require("../../models/dashboard/roomsAndCategory"));
// Function for handling rooms and categories
const AddroomsAndCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomNo, category } = req.body;
        // Ensure input validation
        if (!roomNo || !category) {
            res.status(400).json({ message: "Room number and category are required." });
            return;
        }
        // Check if room already exists
        const existingRoom = yield roomsAndCategory_1.default.findOne({ roomNo });
        if (!existingRoom) {
            const newRoomAndCategory = new roomsAndCategory_1.default({
                roomNo,
                category,
            });
            yield newRoomAndCategory.save(); // Save the new room
            res.status(201).json({ message: "Room allotted to category successfully.", newRoomAndCategory });
        }
        else {
            res.status(409).json({ message: "Room already exists." });
        }
    }
    catch (error) {
        console.error("Error adding room and category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.AddroomsAndCategories = AddroomsAndCategories;
// Function for getting rooms and categories
const getRoomsAndCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield roomsAndCategory_1.default.find().sort({ roomNo: 1 });
        const groupedRooms = {};
        // Group rooms by category
        rooms.forEach((room) => {
            if (!groupedRooms[room.category]) {
                groupedRooms[room.category] = [];
            }
            groupedRooms[room.category].push(room.roomNo);
        });
        const roomRanges = Object.keys(groupedRooms).map((category) => {
            const roomNumbers = groupedRooms[category].sort((a, b) => parseInt(a) - parseInt(b));
            let missingRooms = null;
            let range = '';
            if (category === "Room Maintainance") {
                const allRooms = Array.from({ length: parseInt(roomNumbers[roomNumbers.length - 1]) - parseInt(roomNumbers[0]) + 1 }, (_, i) => (parseInt(roomNumbers[0]) + i).toString());
                const missingRoomNumbers = allRooms.filter(room => !roomNumbers.includes(room));
                if (missingRoomNumbers.length > 0) {
                    missingRooms = `Missing rooms: ${missingRoomNumbers.join(', ')}`;
                }
                range = roomNumbers.length > 1 ? `${roomNumbers[0]} to ${roomNumbers[roomNumbers.length - 1]}` : roomNumbers[0];
            }
            else {
                const roomMatches = roomNumbers.map(room => {
                    const match = room.match(/([A-Za-z]+)(\d+)/);
                    return match ? { prefix: match[1], num: parseInt(match[2]) } : null;
                });
                const validRoomMatches = roomMatches.filter((room) => room !== null);
                if (validRoomMatches.length > 0) {
                    const firstNum = validRoomMatches[0].num;
                    const lastNum = validRoomMatches[validRoomMatches.length - 1].num;
                    const allNumbers = Array.from({ length: lastNum - firstNum + 1 }, (_, i) => firstNum + i);
                    const existingNumbers = validRoomMatches.map((room) => room.num);
                    const missingNumbers = allNumbers.filter(num => !existingNumbers.includes(num));
                    if (missingNumbers.length > 0) {
                        missingRooms = `Missing rooms: ${missingNumbers.map(num => `${validRoomMatches[0].prefix}${num}`).join(', ')}`;
                    }
                    range = `${validRoomMatches[0].prefix}${firstNum} to ${validRoomMatches[validRoomMatches.length - 1].prefix}${lastNum}`;
                }
            }
            return {
                category,
                range,
                missingRooms,
                count: roomNumbers.length,
            };
        });
        res.status(200).json({ message: "Rooms fetched successfully", rooms: roomRanges });
    }
    catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getRoomsAndCategories = getRoomsAndCategories;
