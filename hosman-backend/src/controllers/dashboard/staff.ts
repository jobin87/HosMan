import { Request, Response } from "express";
import StaffModel from "../../models/dashboard/staff";

export const staffAdded = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Name, staffRegId, contactNumber, staffType } = req.body;
    const existingStaff = await StaffModel.findOne({ staffRegId });

    if (existingStaff) {
      res.status(400).json({ message: "Staff already registered" });
    } else {
      const newStaff = new StaffModel({ Name, staffRegId, contactNumber, staffType });
      await newStaff.save();
      res.status(201).json({ message: "Staff added successfully", staff: newStaff, staffAdded: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { staffType } = req.query;

    let staffData;

    if (staffType) {
      staffData = await StaffModel.find({ staffType })
        .select('staffType Name contactNumber staffRegId')
        .sort({ staffRegId: 1 }); // Ensures stable sorting by staffRegId
      if (staffData.length === 0) {
        res.status(404).json({ message: "No staff found for this type" });
      }
    } else {
      staffData = await StaffModel.aggregate([
        {
          $group: {
            _id: "$staffType",
            staffList: { $push: "$$ROOT" },
          },
        },
        {
          $match: {
            "_id": { $ne: null },
          },
        },
        {
          $project: {
            _id: 1,
            staffList: {
              $map: {
                input: { $sortArray: { input: "$staffList", sortBy: { staffRegId: 1 } } },
                as: "staff",
                in: {
                  staffRegId: "$$staff.staffRegId",
                  Name: "$$staff.Name",
                  contactNumber: "$$staff.contactNumber",
                  staffType: "$$staff.staffType",
                },
              },
            },
          },
        },
        { $sort: { _id: 1 } }, // Stable sort by staffType group
      ]);
    }

    res.status(200).json({
      message: staffType ? "Filtered staff fetched successfully" : "All staff grouped by type",
      staffData,
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
