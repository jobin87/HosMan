import { Request, Response } from "express";
import AppointmentModel from "../../models/dashboard/appointment";
import StaffModel from "../../models/dashboard/staff";
import { notifyAppointmentUpdate } from "../..";

export const appointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { department, doctorName, patientName, appointmentTime, appointmentDate, payment } = req.body;

    // Check for missing fields
    if (!department || !doctorName || !patientName || !appointmentTime || !appointmentDate || !payment) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // ✅ Check if an appointment already exists for the same doctor, date, and time
    const existingAppointment = await AppointmentModel.findOne({
      doctorName,
      appointmentDate,
      appointmentTime
    });

    if (existingAppointment) {
      res.status(409).json({ message: "This appointment slot is already booked. Please choose another time." });
      return;
    }

    // ✅ Create and save the new appointment
    const newAppointment = new AppointmentModel({
      department,
      doctorName,
      patientName,
      appointmentTime,
      appointmentDate,
      payment
    });

    console.log("New appointment object:", newAppointment);
    await newAppointment.save();

    notifyAppointmentUpdate()

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
      success: true
    });
  } catch (error: any) {
    console.error("Appointment creation error:", error);
    res.status(500).json({ message: "Internal server error while booking appointment" });
  }
};


export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all appointments from the database
    const appointments = await AppointmentModel.find();

    // Log for debugging
    console.log("Retrieved appointments:", appointments);

    res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments, // Return all appointments directly
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Internal server error while fetching appointment data" });
  }
};

