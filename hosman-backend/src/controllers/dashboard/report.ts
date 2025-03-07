import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import ReportModel from "../../models/dashboard/report";
import mongoose from "mongoose";
import { notifyReportsUpdate } from "../..";

export const AddReports = async (req: Request, res: Response): Promise<void> => {
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
      isAssigned: false, // ✅ Default value when a report is created
    });

    await newReport.save();
    notifyReportsUpdate()
    res.status(201).json({ message: "Report added successfully", reportId: reportId, newReport });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Report ID already exists." });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};

export const getReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reportId } = req.query;

    if (reportId) {
      const existingReport = await ReportModel.findById(reportId);

      if (existingReport) {
        res.status(200).json({ message: "Report found", report: existingReport });
      } else {
        res.status(404).json({ message: "Report not found" });
      }
    } else {
      // ✅ Step 1: Sort reports globally by createdAt (ascending)
      const reportdata = await ReportModel.aggregate([
        { $sort: { createdAt: 1 } }, // Oldest reports first
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
            reports: { $push: "$$ROOT" }, // Maintain createdAt order within category
          },
        },
        { $sort: { "_id": 1 } } // ✅ Ensure categories appear in a consistent order
      ]);

      res.status(200).json({ message: "All reports fetched successfully", reportdata });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};


export const AssignWorkers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reportId, assignedWorker } = req.body;

    console.log("🔍 Received Request - Report ID:", reportId, "Worker:", assignedWorker);

    if (!reportId) {
      res.status(400).json({ message: "reportId is required" });
      return;
    }

    // ✅ Convert `reportId` to ObjectId to match MongoDB `_id`
    const objectId = new mongoose.Types.ObjectId(reportId);

    // ✅ Find by `_id` instead of `reportId`
    const existingReport = await ReportModel.findById(objectId);

    if (!existingReport) {
      console.log("❌ Report not found for ID:", reportId);
      res.status(404).json({ message: "Report not found" });
      return;
    }

    // ✅ Update assigned worker & isAssigned status
    const updatedReport = await ReportModel.findByIdAndUpdate(
      objectId,
      { $set: { assignedWorker, isAssigned: !!assignedWorker } },
      { new: true }
    );

    console.log("✅ Worker Assigned Successfully:", updatedReport);

    res.status(200).json({ message: "Worker assigned successfully", updatedReport });
  } catch (error: any) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
