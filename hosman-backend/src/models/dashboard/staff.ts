import mongoose from "mongoose";

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
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 1, 
    },
    contactNumber: {
      type: Number, 
      required: true,
      min: 1000000000, 
      max: 999999999999999, 
    },
    staffRegId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const StaffModel = mongoose.model("StaffModel", staffSchema);

export default StaffModel;
