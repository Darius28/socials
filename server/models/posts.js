import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

export const postSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true
    },
    content: {
      type: String,
      required: true,
      max: 240,
    },
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
