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

export const treatementAdded = async(req:Request,res:Response):Promise<void>=>{
  try{
    const {treatment,specialization,department,price,id}= req.body
    const existingDoctor = await Treatment.findOne({department})

    if(existingDoctor){
        res.status(400).json({message:"doctor already registered"})
    }
    else{ 
        const newTreatment = new Treatment({treatment,specialization,department,price,id})
        await newTreatment.save();
        res.status(201).json({ message: "Patient added successfully", Treatment: newTreatment, treatmentAdded:true });
    }

  }
  catch(error){
    res.status(500).json({message:"internal server error ", error})
  }

}

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
