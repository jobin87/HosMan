import { Request, Response } from "express";
import StaffModel from "../../models/dashboard/staff";
import { notifyStaffUpdate } from "../..";

export const addStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Name, staffType, department, experience, contactNumber, staffRegId } = req.body;
    const existingStaff = await StaffModel.findOne({ staffRegId });

    if (existingStaff) {
      res.status(400).json({ message: "Staff already registered" });
    } else {
      const newStaff = new StaffModel({ Name, staffType, department, experience, contactNumber, staffRegId });
      await newStaff.save();
      notifyStaffUpdate()
      res.status(201).json({ message: "Staff added successfully", staff: newStaff });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};



export const getStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const staffData = await StaffModel.find();
    console.log("Fetched staff data:", staffData);

    if (staffData.length === 0) {
      res.status(404).json({ message: "No staff found" });
      return;
    }


    // Group staff by staffType
    const groupedStaff = staffData.reduce((acc: Record<string, any[]>, staff) => {
      const { staffType } = staff;
      if (!acc[staffType]) {
        acc[staffType] = [];
      }
      acc[staffType].push(staff);
      return acc;
    }, {});
    console.log("Grouped staff data:", JSON.stringify(groupedStaff, null, 2));

    res.status(200).json({
      message: "Staff grouped by staff type",
      groupedStaff,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};






