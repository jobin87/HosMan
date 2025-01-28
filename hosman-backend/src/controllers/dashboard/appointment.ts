import { Request, Response } from "express";
import AppointmentModel from "../../models/dashboard/appointment";

export const appointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { department, doctor, patientName, appointmentTime, appointmentDate, payment } = req.body;

    // Check for missing fields
    if (!department || !doctor || !patientName || !appointmentTime || !appointmentDate || !payment) {
     res.status(400).json({ message: 'All fields are required' });
     return
    }

    // Create and save the new appointment
    const newAppointment = new AppointmentModel({
      department,
      doctor,
      patientName,
      appointmentTime,
      appointmentDate,
      payment,
    });

    console.log("New appointment object:", newAppointment);
    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error: any) {
    console.error("Appointment creation error:", error);
    res.status(500).json({ message: "Internal server error while booking appointment" });
  }
};

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const departmentCounts = await AppointmentModel.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
          appointments: {
            $push: {
              patientName: "$patientName",
              appointmentTime: "$appointmentTime",
              appointmentDate: "$appointmentDate",
              doctor: "$doctor",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          count: 1,
          appointments: 1,
        },
      },
    ]);

    const departments = [
      { id: 1, name: "Cardiology" },
      { id: 2, name: "Neurology" },
      { id: 3, name: "Orthopedics" },
      { id: 4, name: "Physician" },
      { id: 5, name: "Dermatologist" },
      { id: 6, name: "Psychiatrist" },
    ];

    const departmentsWithAppointments = departments.map((department) => {
      const departmentData = departmentCounts.find(
        (d) => d.department === department.name
      );
      return {
        ...department,
        count: departmentData ? departmentData.count : 0,
        appointments: departmentData ? departmentData.appointments : [],
      };
    });

    res.status(200).json({
      message: "Appointments retrieved successfully",
      departments: departmentsWithAppointments,
    });
  } catch (error) {
    console.error("Error fetching department appointment counts:", error);
    res.status(500).json({ message: "Internal server error while fetching appointment data" });
  }
};

