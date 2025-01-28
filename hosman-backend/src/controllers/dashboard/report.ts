import { Request, Response } from "express";
import ReportModel from "../../models/dashboard/report";
import { v4 as uuidv4 } from "uuid";

export const AddReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { description, status, category, priority, dateReported }= req.body;

    if (!description|| !status || !category || !priority || !dateReported ) {
        res.status(400).json({ message: 'All fields are required' });
        return
       }

       const finalReportId =  `RPT-${uuidv4()}`;

       const newReport = new ReportModel({
         reportId: finalReportId,
         description,
         category,
         priority,
         dateReported,
       });
   
       await newReport.save();
       res.status(201).json({ message: "Report added successfully", reportId: finalReportId });
     } catch (error: any) {
       if (error.code === 11000) {
         res.status(409).json({ message: "Report ID already exists." });
       } else {
         res.status(500).json({ message: "Server error", error: error.message });
       }
      }
};
