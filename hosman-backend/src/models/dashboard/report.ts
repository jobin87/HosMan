import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
      category: {
        type: String,
        required: true,
        trim: true,
      },
      roomNo: {
        type: String,
        required:true,
        trim: true
      },
      
    
   
  },
  { timestamps: true }
);

const ReportModel = mongoose.model('addReport', reportSchema);

export default ReportModel;
