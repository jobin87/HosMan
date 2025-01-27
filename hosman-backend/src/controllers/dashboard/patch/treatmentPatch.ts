import { Request, Response } from "express";
import mongoose from "mongoose";
import Treatment from "../../../models/dashboard/treatment";

export const updateTreatment = async (req: Request, res: Response): Promise<void> => {
    const { treatmentId } = req.params;
  
    console.log("Received treatmentId:", treatmentId);  // Log the received ID
  
    if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
      res.status(400).json({ message: "Invalid treatment ID format" });
      return;
    }
  
    const updateFields = req.body;
  
    try {
      const updatedTreatment = await Treatment.findByIdAndUpdate(
        treatmentId,
        { $set: updateFields },  // Only update provided fields
        { new: true }
      );
  
      if (!updatedTreatment) {
        res.status(404).json({ message: 'Treatment not found' });
        return;  // Ensure the function ends execution here
      }
  
      res.status(200).json({ treatmentData: updatedTreatment });
    } catch (error) {
      console.error("Error updating treatment:", error);
      res.status(500).json({ message: 'Error updating treatment' });
    }
  };
  