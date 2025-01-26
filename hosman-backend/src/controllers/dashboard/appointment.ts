import  { Request, Response } from "express"
import AppointmentModel from "../../models/dashboard/appointment";


export const appointments= async(req:Request,res:Response):Promise<void>=>{
    try{
        const {department, doctor, patientName, appointmentTime, appointmentDate, payment} = req.body;
        if (!department || !doctor || !patientName || !appointmentTime || !appointmentDate || !payment) {
            res.status(400).json({ message: 'All fields are required' });
          }

          const newAppointment = new AppointmentModel ({
            department,
            doctor,
            patientName,
            appointmentTime,
            appointmentDate,
            payment,
          });
          console.log('New appointment object:', newAppointment);
          await newAppointment.save();

          res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment});

    }
    catch(error:any){
        res.status(500).json({message:" appointmentdata error: internal server error "})

    }

}

// Route to get count of appointments by department

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetching counts of appointments grouped by department
    const departmentCounts = await AppointmentModel.aggregate([
      {
        $group: {
          _id: "$department",  // Group by department
          count: { $sum: 1 },   // Count the number of appointments for each department
        }
      },
      {
        $project: {
          _id: 0,       // Remove the _id field from results
          department: "$_id", // Rename _id to department
          count: 1      // Include the count field
        }
      }
    ]);

    // Sample department data - you can add more departments as needed
    const departments = [
      { id: 1, name: 'Cardiology' },
      { id: 2, name: 'Neurology' },
      { id: 3, name: 'Orthopedics' },
      { id: 4, name: 'Physician' },
      { id: 5, name: 'Dermatologist' },
      { id: 6, name: 'Psychiatrist' },
    ];

    // Merge the department counts with the static departments
    const departmentsWithCounts = departments.map(department => {
      // Find the department count or default to 0 if not found
      const departmentCount = departmentCounts.find(d => d.department === department.name);
      const count = departmentCount ? departmentCount.count : 0;
      return { ...department, count };
    });

    // Respond with the department appointment counts
    res.status(200).json({
      message: 'Department appointment counts retrieved successfully',
      departments: departmentsWithCounts
    });
  } catch (error) {
    console.error("Error fetching department appointment counts:", error); // Better error logging
    res.status(500).json({ message: 'Internal server error while fetching appointment counts' });
  }
};
