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
    isPremium:{
      type:Boolean,
      default: false

    },
    role:{
      type: String,
      enum:['Hospital','Individual'],
      default:'Individual'
    },
    category:{
      type:String,
      enum:["Doctor", "Nurse","Management"]
    }

   
  },
  { timestamps: true },
  
);

const User = mongoose.model('User', userSchema);

export default User;
