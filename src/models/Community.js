// Import mongoose to work with MongoDB
import mongoose from "mongoose";

// Define a schema for a community
const communitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [
      {
        title: String,
        description: String,
        image: String, // URL of the image
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
});

// Create a Community model using the community schema
const Community = mongoose.model('Community', communitySchema);

// Export the Community model
export default Community;

