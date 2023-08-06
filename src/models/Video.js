// Import mongoose to work with MongoDB
import mongoose from "mongoose";

// Define a schema for a video
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 2 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  notes: [ 
    { type: mongoose.Schema.Types.ObjectId, ref: "Note" },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

// Change format of hashtag when it's stored in database
videoSchema.static("formatHashtags", function(hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? `${word} ` : ` #${word}`))
})

// Create a Video model using the video schema
const Video = mongoose.model("Video", videoSchema);

// Export the Video model
export default Video;
