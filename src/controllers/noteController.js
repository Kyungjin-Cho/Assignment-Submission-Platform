// Import relevant models and path
import Note from "../models/Note";
import Video from "../models/Video";
import path from "path";

// Render the upload note page
export const getUpload = (req, res) => {
  return res.render("uploadNote", { pageTitle: "Upload Note" });
}

// Handle post request to upload note
export const postUpload = async (req, res) => {
  // Accessing the user's ID from req.session.user instead of req.user
  const {
    user: { _id } = req.session, 
    params: { id },
    file,
    body: { title, description }
  } = req;

  // Check for required fields
  if (!title) {
    return res.status(400).render("400", { pageTitle: "Title is required" });
  }

  const video = await Video.findById(id).populate("notes");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  
  const note = await Note.create({
    title,
    description,
    fileUrl: file ? file.path : "",
    owner: _id,
    video: id
  });
  
  video.notes = [note._id]; 
  await video.save();
  return res.redirect(`/videos/${id}`);
};

// Handle request for downloading a note
export const downloadNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).render("404", { pageTitle: "Note not found." });
  }
  const absolutePath = path.resolve(note.fileUrl);
  res.download(absolutePath);
};
