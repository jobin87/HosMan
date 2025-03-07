import { Request, Response } from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
const SECRET_KEY = "112eryt33";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { promises } from "readline"
import Treatment from "../../models/dashboard/treatment";
import mongoose from "mongoose";
import { notifyTreatmentUpdate } from "../..";



export const treatementAdded = async (req: Request, res: Response): Promise<void> => {
  try {
    const { treatment, specialization, department, price, id } = req.body;

    // ✅ Correct check for duplicate treatments
    const existingTreatment = await Treatment.findOne({ 
      treatment, specialization, department 
    });

    if (existingTreatment) {
       res.status(400).json({ message: "Treatment already registered", success: false });
       return
    }

    const newTreatment = new Treatment({ treatment, specialization, department, price, id });
    await newTreatment.save();
    notifyTreatmentUpdate()

     res.status(201).json({ 
      message: "Treatment added successfully", 
      Treatment: newTreatment, 
      success: true, 
      treatmentAdded: true 
    });
    return

  } catch (error) {
    console.error("Error adding treatment:", error);
    res.status(500).json({ message: "Internal server error", success: false, error });
  }
};


export const getTreatment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;  // Use query params instead of body for GET requests

    // If `doctorRegId` is provided, fetch specific doctor; otherwise, return all doctors
    if (id) {
      const existingDepartment = await Treatment.findById(id);

      if (existingDepartment) {
        res.status(200).json({ 
          message: "Doctor found",
          doctor: existingDepartment
        });
      } else {
        res.status(405).json({ message: "treatment not found" });
      }
    } else {
      // If no `patientRegId` provided, return all doctors
      const treatmentData=  await Treatment.find();
    
    
      res.status(200).json({ 
        message: "All treatment fetched successfully",
       treatmentData
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete a single treatment by ID
export const deleteTreatmentById = async (req: Request, res: Response):Promise<void> => {
  try {
    const {id} = req.params;
    const deletedTreatment = await Treatment.findByIdAndDelete(id);

    if (!deletedTreatment) {
    res.status(404).json({ message: 'Treatment not found' });
    }

    res.status(200).json({ message: 'Treatment deleted successfully' ,treatmentDeletedBYID:true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting treatment', error });
  }
};




// Handler to delete all treatments
export const deleteAllTreatments = async (req: Request, res: Response): Promise<void> => {
    try {
        // Delete all treatments
        const result = await Treatment.deleteMany({});

        // Check if any treatments were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All treatments have been deleted successfully' });
        } else {
            res.status(404).json({ message: 'No treatments found to delete' });
        }
    } catch (error) {
        console.error("Error deleting treatments:", error);
        res.status(500).json({ message: 'Error deleting treatments' });
    }
};

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



