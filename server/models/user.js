import mongoose from "mongoose";
const { Schema } = mongoose;
import { postSchema } from "./posts";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      max: 64,
      required: true,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    posts: [postSchema],
    profile_pic: {},
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
