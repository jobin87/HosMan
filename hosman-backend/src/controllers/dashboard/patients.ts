import { Request, Response } from "express";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
const SECRET_KEY = "112eryt33";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { promises } from "readline"
import Patient from "../../models/dashboard/patient";
import { notifyPatientUpdate } from "../..";

export const PatientAdded = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientName, contactNumber, disease, age, patientRegId } = req.body;
    const existingPatient = await Patient.findOne({ patientRegId });

    if (existingPatient) {
       res.status(400).json({ message: "Patient already registered" });
       return
    }

    const newPatient = new Patient({ patientName, patientRegId, disease, age, contactNumber });
    await newPatient.save();
    notifyPatientUpdate()

    res.status(201).json({ message: "Patient added successfully", patient: newPatient, patientAdded: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientRegId } = req.body;  // Use query params instead of body for GET requests

    // If `doctorRegId` is provided, fetch specific doctor; otherwise, return all doctors
    if (patientRegId) {
      const existingPatient = await Patient.findOne({ patientRegId });

      if (existingPatient) {
        res.status(200).json({ 
          message: "Doctor found",
          doctor: existingPatient
        });
      } else {
        res.status(405).json({ message: "patient not found" });
      }
    } else {
      // If no `patientRegId` provided, return all doctors
      const patientsdata=  await Patient.find();


      res.status(200).json({ 
        message: "All patients fetched successfully",
       patientsdata
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
