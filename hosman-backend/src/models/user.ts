import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Prevent duplicate emails
    },
    password: {
      type: String,
      required: true,
    },
    userRegNum: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Manager', 'Doctor', 'Nurse'],
      required:true
    },
    zipCode: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,  // <-- Add this field
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
