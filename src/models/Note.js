// Import mongoose to work with MongoDB
import mongoose from "mongoose";

// Define a schema for a note
const NoteSchema = new mongoose.Schema({
    fileUrl: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    video: {type: mongoose.Schema.Types.ObjectId, ref: "Video"}
});

// Create a Note model using the note schema
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
export default Note;
