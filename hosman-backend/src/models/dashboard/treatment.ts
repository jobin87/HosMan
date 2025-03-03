import mongoose from "mongoose";

const treatmentSchema= new mongoose.Schema(
    {
      department: {
        type: String,
        required: true,
      },
      specialization: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      treatment: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
  );
  
  // Create a model from the schema
  const Treatment = mongoose.model('Treatment', treatmentSchema);
  
  export default Treatment;