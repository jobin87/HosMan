import { Request, Response } from "express";
import StaffModel from "../../models/dashboard/staff";
import mongoose from "mongoose";
import DepartmentModel from "../../models/dashboard/department";


export const addStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Name, staffType, department, experience, contactNumber, staffRegId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(department)) {
      res.status(400).json({ message: "Invalid department ID" });
      return;
    }

    const existingDepartment = await DepartmentModel.findById(department);
    if (!existingDepartment) {
      res.status(404).json({ message: "Department not found" });
      return;
    }

    const existingStaff = await StaffModel.findOne({ staffRegId });
    if (existingStaff) {
      res.status(400).json({ message: "Staff already registered" });
      return;
    }

    const newStaff = new StaffModel({
      Name,
      staffType,
      department,
      experience,
      contactNumber,
      staffRegId,
    });

    await newStaff.save();

    // Populate department name along with staff details
    const populatedStaff = await StaffModel.findById(newStaff._id).populate('department', 'name');

    res.status(201).json({ message: "Staff added successfully", staff: populatedStaff });
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
