import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    staffType: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
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
    staffRegId: {
      type: String,
      required: true,
    },
    
   
  },
  { timestamps: true }
);

const StaffModel = mongoose.model('StaffModel', staffSchema);

export default StaffModel;
