import mongoose from 'mongoose';

const roomAndCategorySchema = new mongoose.Schema(
  {
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

const RoomAndCategory = mongoose.model('roomAndCategory', roomAndCategorySchema);

export default RoomAndCategory;
