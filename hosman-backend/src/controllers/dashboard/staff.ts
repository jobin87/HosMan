import { Request, Response } from "express";
import StaffModel from "../../models/dashboard/staff";

export const addStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Name, staffType, department, experience, contactNumber, staffRegId } = req.body;
    const existingStaff = await StaffModel.findOne({ staffRegId });

    if (existingStaff) {
      res.status(400).json({ message: "Staff already registered" });
    } else {
      const newStaff = new StaffModel({ Name, staffType, department, experience, contactNumber, staffRegId });
      await newStaff.save();
      res.status(201).json({ message: "Staff added successfully", staff: newStaff });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { staffType } = req.query;

    // If staffType is provided, filter by staffType; otherwise, return all staff
    const staffData = staffType
      ? await StaffModel.find({ staffType })
      : await StaffModel.find();

    if (staffData.length === 0) {
      res.status(404).json({ message: "No staff found" });
    } else {
      res.status(200).json({
        message: staffType ? `Staff of type '${staffType}' fetched successfully` : "All staff fetched",
        staffData,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
