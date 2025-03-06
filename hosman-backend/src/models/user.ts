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
    department: {
      type: String,
      required: true,
      trim: true,
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
    photoURL: {
      type: String, 
      default: "https://i.pinimg.com/736x/3b/33/47/3b3347c6e29f5b364d7b671b6a799943.jpg", // ✅ Default profile image
    },

  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
