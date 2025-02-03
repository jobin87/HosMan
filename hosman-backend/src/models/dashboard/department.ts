import mongoose, { Schema, Document } from "mongoose";

interface IDepartment extends Document {
  name: string;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const DepartmentModel = mongoose.model<IDepartment>("Department", departmentSchema);

export default DepartmentModel;
