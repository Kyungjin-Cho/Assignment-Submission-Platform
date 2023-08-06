// Import bcrypt to enhance security regarding p/w
import bcrypt from "bcrypt";
// Import mongoose to work with MongoDB
import mongoose from "mongoose";

// Define a schema for a user
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

// Hash password when it's stored in database
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

// Create a User model using the user schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;