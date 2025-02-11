import { Request, Response } from "express";
import AppointmentModel from "../../models/dashboard/appointment";
import StaffModel from "../../models/dashboard/staff";

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
    // Fetch doctors and their departments from staff data
    const doctors = await StaffModel.find({ staffType: 'Doctor' }).populate('department', 'Name'); // Assuming 'department' is a reference

    // Extract the list of departments from the doctor data
    const doctorDepartments = doctors.map(doctor => doctor.department).filter(Boolean);

    // Fetch the appointment data and group by department
    const departmentCounts = await AppointmentModel.aggregate([
      {
        $group: {
          _id: "$department", // Group by department field in appointments
          count: { $sum: 1 }, // Count number of appointments in each department
          appointments: {
            $push: {
              patientName: "$patientName",
              appointmentTime: "$appointmentTime",
              appointmentDate: "$appointmentDate",
              doctor: "$doctor", // Assuming 'doctor' is a reference to staff/doctor
            },
          },
        },
      },
      {
        $lookup: {
          from: "departments", // Ensure this collection matches your department collection name
          localField: "_id", // The department ID in appointment model
          foreignField: "_id", // The department ID in departments collection
          as: "departmentInfo",
        },
      },
      {
        $unwind: "$departmentInfo", // Unwind to flatten department data
      },
      {
        $project: {
          department: "$departmentInfo.name", // Get department name from the departmentInfo
          departmentId: "$_id",
          count: 1, // Include count of appointments
          appointments: 1, // Include all appointment details
        },
      },
    ]);

    // Log the department counts for debugging
    console.log("Aggregated department counts:", departmentCounts);

    // Merge the fetched doctor departments with the departmentCounts
    const departmentsWithAppointments = doctorDepartments.map(departmentName => {
      const departmentData = departmentCounts.find(d => d.department === departmentName);
      return {
        department: departmentName,
        count: departmentData ? departmentData.count : 0, // If no data, set count to 0
        appointments: departmentData ? departmentData.appointments : [], // If no data, set empty appointments array
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
