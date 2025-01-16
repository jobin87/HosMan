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
    },
    password: {
      type: String,
      required: true,
    },
    userRegNum:{
      type:String,
      required:true

    },
    role:{
      type: String,
      enum:['Manager','Doctor','Nurse'],
      default:'Manager'
    },
    zipCode:{
      type: String,
      required: true,
    },
    isVerified: { type: Boolean, default: false }, 


   
  },
  { timestamps: true },
  
);

const User = mongoose.model('User', userSchema);

export default User;
