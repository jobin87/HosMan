import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
      },
      disease: {
        type: String,
        required: true,
        trim: true,
      },
      age: {
        type: String,
        required: true,
        trim: true,
      },
      patientRegId: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        enum: ['Active', 'Distcharged'],
        default: 'Active',
        required:false,
      },
    
   
  },
  { timestamps: true }
);

const Patient = mongoose.model('addPatient', patientSchema);

export default Patient;
