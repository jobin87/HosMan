import { Request, Response } from "express";
import RoomAndCategory from "../../models/dashboard/roomsAndCategory";

export const roomsAndCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const { roomNo, category } = req.body;

        // Ensure input validation
        if (!roomNo || !category) {
            res.status(400).json({ message: "Room number and category are required." });
            return;
        }

        // Correct the find query
        const existingRoom = await RoomAndCategory.findOne({ roomNo });

        if (!existingRoom) {
            const newRoomAndCategory = new RoomAndCategory({
                roomNo,
                category,
            });

            await newRoomAndCategory.save(); // Save new record to the database
            res.status(201).json({ message: "Room allotted to category successfully.", newRoomAndCategory });
        } else {
            res.status(409).json({ message: "Room already exists." });
        }
    } catch (error) {
        console.error("Error adding room and category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getRoomsAndCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      // Fetch all rooms and categories
      const rooms = await RoomAndCategory.find().sort({ roomNo: 1 });
  
      // Define the type for the accumulator with an index signature
      const groupedRooms: { [key: string]: string[] } = {};
  
      // Group rooms by category
      rooms.forEach((room) => {
        if (!groupedRooms[room.category]) {
          groupedRooms[room.category] = [];
        }
        groupedRooms[room.category].push(room.roomNo);
      });
  
      // Format the response with room ranges for each category
      const roomRanges = Object.keys(groupedRooms).map((category) => {
        const roomNumbers = groupedRooms[category].sort((a, b) => parseInt(a) - parseInt(b)); // Sort room numbers numerically
  
        let missingRooms: string | null = null;
        let range: string = '';
  
        // Handle numeric room categories (Room Maintainance)
        if (category === "Room Maintainance") {
          const allRooms = Array.from({ length: parseInt(roomNumbers[roomNumbers.length - 1]) - parseInt(roomNumbers[0]) + 1 }, (_, i) => (parseInt(roomNumbers[0]) + i).toString());
          const missingRoomNumbers = allRooms.filter(room => !roomNumbers.includes(room));
  
          if (missingRoomNumbers.length > 0) {
            missingRooms = `Missing rooms: ${missingRoomNumbers.join(', ')}`;
          }
  
          range = roomNumbers.length > 1 ? `${roomNumbers[0]} to ${roomNumbers[roomNumbers.length - 1]}` : roomNumbers[0];
        } else {
          // Handle non-numeric room categories (like Lab1, Lab2)
          const roomMatches = roomNumbers.map(room => {
            const match = room.match(/([A-Za-z]+)(\d+)/);
            return match ? { prefix: match[1], num: parseInt(match[2]) } : null;
          });
  
          // Filter out null values from roomMatches
          const validRoomMatches = roomMatches.filter((room): room is { prefix: string, num: number } => room !== null);
  
          // Ensure there are matched rooms and handle missing room checks
          if (validRoomMatches.length > 0) {
            const firstNum = validRoomMatches[0].num;
            const lastNum = validRoomMatches[validRoomMatches.length - 1].num;
  
            // Generate all numbers in the range
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
  
      // Send the formatted response
      res.status(200).json({ message: "Rooms fetched successfully", rooms: roomRanges });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
