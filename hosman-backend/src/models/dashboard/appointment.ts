import mongoose from "mongoose";

const appointmentSchema= new mongoose.Schema(
    {
      department: {
        type: String,
        required: true,
      },
      doctorName: {
        type: String,
        required: true,
      },
      patientName: {
        type: String,
        required: true,
      },
      appointmentTime: {
        type: String,
        required: true,
      },
      appointmentDate: {
        type: String,
        required: true,
      },
      payment: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
  );
  
  // Create a model from the schema
  const AppointmentModel = mongoose.model('Appointment', appointmentSchema);
  
  export default AppointmentModel;