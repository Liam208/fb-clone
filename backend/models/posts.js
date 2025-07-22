import mongoose, { trusted } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxLength: 255
    },
    userEmail: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const PostDB = mongoose.model("posts", postSchema);

export default PostDB;
