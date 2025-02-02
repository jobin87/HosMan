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
      contactNumber: {
        type: String,
        required: true,
        trim: true,
      },
    staffRegId: {
      type: String,
      required: false,
    },
   
  },
  { timestamps: true }
);

const StaffModel = mongoose.model('addStaff', staffSchema);

export default StaffModel;
