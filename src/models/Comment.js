// Import mongoose to work with MongoDB
import mongoose from "mongoose";

// Define a schema for a comment
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true }, 
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, 
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" }, 
  createdAt: { type: Date, required: true, default: Date.now }, 
});

// Create a Comment model using the comment schema
const Comment = mongoose.model("Comment", commentSchema);

// Export the Comment model
export default Comment;
