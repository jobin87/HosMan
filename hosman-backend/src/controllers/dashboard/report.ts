import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import ReportModel from "../../models/dashboard/report";

// Define RoomCategory type for strict type checking
type RoomCategory =
  | "Room Maintenance"
  | "Lab Equipment Issues"
  | "Inventory Needs"
  | "Patient Needs"
  | "Staff Shortages";

export const AddReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { description, category, roomNo } = req.body;

    if (!description || !category || !roomNo) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const reportId = `RPT-${uuidv4()}`;
    const dateReported = new Date().toISOString();

    const newReport = new ReportModel({
      reportId: reportId,
      description,
      category,
      roomNo,
      dateReported,
    });

    await newReport.save();
    res
      .status(201)
      .json({
        message: "Report added successfully",
        reportId: reportId,
        newReport,
      });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Report ID already exists." });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};

export const getReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reportId } = req.query;

    // If a specific reportId is provided, fetch that report
    if (reportId) {
      const existingReport = await ReportModel.findOne({ reportId });

      res.status(200).json({
        message: "Report found",
        report: existingReport,
      });
    } else {
      // Fetch all reports and include roomOptions for each report
      const reportData = await ReportModel.find();

      // Add roomOptions to each report in the data
      const roomOptions: Record<RoomCategory, string[]> = {
        "Room Maintenance": ["Room 101", "Room 102", "Room 103"],
        "Lab Equipment Issues": ["Lab 1", "Lab 2", "Lab 3", "Lab 4", "Lab 5"],
        "Inventory Needs": ["Storage A", "Storage B"],
        "Patient Needs": ["Ward 1", "Ward 2", "Ward 3"],
        "Staff Shortages": ["Admin Room", "Staff Room"],
      };

      const reportDataWithRoomOptions = reportData.map((report) => ({
        ...report.toObject(),
        roomOptions: roomOptions, // Adding roomOptions to each report
      }));

      res.status(200).json({
        message: "All reports fetched successfully",
        reportData: reportDataWithRoomOptions,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
