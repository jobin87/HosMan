import mongoose from 'mongoose';

const staffCreatingSchema = new mongoose.Schema(
  {
      staffName: {
        type: String,
        required: true,
        trim: true,
      },
      staffPosition: {
        type: String,
        required:true,
        trim: true
      },
   
  },
  { timestamps: true }
);

const StaffRoles = mongoose.model('staffcreated', staffCreatingSchema);

export default StaffRoles;
