import mongoose, { Document, Schema } from "mongoose";

// Define session document interface
interface ISession extends Document {
  userId: mongoose.Schema.Types.ObjectId;  // Reference to the User model
  token: string;  // JWT token for session tracking
  deviceId: string;
  role: string;
  specialization: string;
  department: string;
  userName: string;
  ipAddress: string;
  isActive: boolean;
  loginTime: Date;
  logoutTime?: Date | null;
}

// Session schema
const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Make sure "User" is your actual model name
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    loginTime: {
      type: Date,
      default: Date.now,
    },
    logoutTime: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Create the session model
const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
