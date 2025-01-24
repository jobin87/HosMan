import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
        type: String,
        required: true,
        trim: true,
      },
      experience: {
        type: String,
        required: true,
        trim: true,
      },
      contactNumber: {
        type: String,
        required: true,
        trim: true,
      },
    doctorRegId: {
      type: String,
      required: false,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
      },
   
  },
  { timestamps: true }
);

const Doctor = mongoose.model('addDoctor', doctorSchema);

export default Doctor;
