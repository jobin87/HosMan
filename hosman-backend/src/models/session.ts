import mongoose, { Document, Schema } from 'mongoose';

// Define session document interface
interface ISession extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;  // JWT token for session tracking
  deviceId: string;
  ipAddress: string;
  isActive: boolean;
  loginTime: Date;
  logoutTime?: Date;
}

// Session schema
const sessionSchema = new Schema<ISession>(
  {
    
    token: {
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
    },
  },
  { timestamps: true }
);

// Create the session model
const Session = mongoose.model<ISession>('Session', sessionSchema);

export default Session;
