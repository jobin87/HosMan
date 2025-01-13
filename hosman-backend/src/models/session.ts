import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // References the User model
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

const Session = mongoose.model('Session', sessionSchema);

export default Session;
