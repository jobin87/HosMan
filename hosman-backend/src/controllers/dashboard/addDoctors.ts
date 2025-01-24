import { Request, Response } from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
const SECRET_KEY = "112eryt33";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { promises } from "readline"
import Doctor from "../../models/doctor";

export const DoctorsAdded = async(req:Request,res:Response):Promise<void>=>{
  try{
    const {doctorName,doctorRegId,specialization,experience,contactNumber} = req.body;
    const existingDoctor = await Doctor.findOne({doctorRegId})

    if(existingDoctor){
        res.status(400).json({message:"doctor already registered"})
    }
    else{ 
        const newDoctor = new Doctor({doctorName,doctorRegId,specialization,experience,contactNumber})
        await newDoctor.save();
        res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    }

  }
  catch(error){
    res.status(500).json({message:"internal server error ", error})
  }

}

export const getDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctorRegId } = req.body;  // Use query params instead of body for GET requests

    // If `doctorRegId` is provided, fetch specific doctor; otherwise, return all doctors
    if (doctorRegId) {
      const existingDoctor = await Doctor.findOne({ doctorRegId });

      if (existingDoctor) {
        res.status(200).json({ 
          message: "Doctor found",
          doctor: existingDoctor
        });
      } else {
        res.status(404).json({ message: "Doctor not found" });
      }
    } else {
      // If no `doctorRegId` provided, return all doctors
      const data = await Doctor.find();
      res.status(200).json({ 
        message: "All doctors fetched successfully",
       data
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
