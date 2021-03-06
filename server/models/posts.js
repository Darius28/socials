import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;
const { userSchema } = require("./user");

export const postSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
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
    likedUsers: [userSchema],
    shares: {
      type: Number,
      default: 0,
    },
    picture: {},
    sketchUri: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
