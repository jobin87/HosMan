import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import ReportModel from "../../models/dashboard/report";

export const AddReports = async (req: Request,res: Response): Promise<void> => {
  try {
    const { description, category, roomNo }= req.body;

    if (!description|| !category || !roomNo )
       {
        res.status(400).json({ message: 'All fields are required' });
        return
       }

       const reportId =  `RPT-${uuidv4()}`;
       const dateReported = new Date().toISOString();

       const newReport = new ReportModel({
         reportId: reportId,
         description,
         category,
         roomNo,
         dateReported,
       });
   
       await newReport.save();
       res.status(201).json({ message: "Report added successfully", reportId: reportId,newReport });
     } 
     catch (error: any) {
       if (error.code === 11000) {
         res.status(409).json({ message: "Report ID already exists." });
       } 
       else {
         res.status(500).json({ message: "Server error", error: error.message });
       }
      }
};
export const getReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reportId } = req.query;

    // If a specific reportId is provided, fetch the report by that ID
    if (reportId) {
      const existingReport = await ReportModel.findOne({ reportId });

      if (existingReport) {
        res.status(200).json({
          message: "Report found",
          report: existingReport,
        });
      } else {
        res.status(404).json({ message: "Report not found" });
      }
    } else {
      // If no specific reportId is provided, fetch all reports and group by category
      const reportdata = await ReportModel.aggregate([
        {
          $group: {
            _id: "$category", // Group by category field
            count: { $sum: 1 }, // Count the number of reports per category
            reports: { $push: "$$ROOT" }, // Push all reports under each category
          },
        },
        {
          $sort: { count: -1 }, // Optional: Sort categories by the count (descending)
        },
      ]);

      res.status(200).json({
        message: "All reports fetched successfully",
        reportdata,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};



