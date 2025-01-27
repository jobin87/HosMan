import { Request, Response } from "express";
import mongoose from "mongoose";
import Treatment from "../../../models/dashboard/treatment";

export const updateTreatment = async (req: Request, res: Response): Promise<void> => {
    
    const { treatmentId } = req.params;

    // Log the received ID for debugging
    console.log("Received treatmentId:", treatmentId);
    
    // Validate treatmentId format using Mongoose's ObjectId validator
    if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
        console.log("Invalid treatmentId format:", treatmentId);
        res.status(400).json({ message: "Invalid treatment ID format" });
        return;
    }

    // Retrieve the fields to update from the request body
    const updateFields = req.body;

    try {
        // Find and update the treatment using the provided treatmentId
        const updatedTreatment = await Treatment.findByIdAndUpdate(
            treatmentId,
            { $set: updateFields }, 
            { new: true }  
        );

        // Check if the treatment was found and updated
        if (!updatedTreatment) {
            res.status(404).json({ message: 'Treatment not found' });
            return; 
        }

        // Successfully updated treatment, return the updated treatment data
        res.status(200).json({ treatmentData: updatedTreatment });
    } catch (error) {
        console.error("Error updating treatment:", error);
        res.status(500).json({ message: 'Error updating treatment' });
    }
};
