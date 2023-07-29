import Note from "../models/Note";
import Video from "../models/Video";

export const getUpload = (req, res) => {
    return res.render("uploadNote", { pageTitle: "Upload Note" });
};

export const postUpload = async (req, res) => {
    const {
        user: { _id },
        params: { id },
        file,
        body: { title, description }
    } = req;
    const video = await Video.findById(id);
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
    video.notes.push(note._id);
    video.save();
    return res.redirect(`/videos/${id}`);
};

export const downloadNote = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
        return res.status(404).render("404", { pageTitle: "Note not found." });
    }
    res.download(note.fileUrl);
};
