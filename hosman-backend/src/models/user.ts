import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    regNumber:{
      type:String,
      default: false

    },
    role:{
      type: String,
      enum:['Manager','Doctor','Nurse'],
      default:'Manager'
    },
    zipCode:{
      type: String,
      required: true,
      unique:true

    }


   
  },
  { timestamps: true },
  
);

const User = mongoose.model('User', userSchema);

export default User;
