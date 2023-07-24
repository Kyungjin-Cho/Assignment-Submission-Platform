import Note from "../models/Note";

export const postAddNote = async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    try {
        const newNote = await Note.create({
            text,
            owner: req.session.user._id,
            video: id,
        });
        return res.status(200).json({ newNoteId: newNote._id });
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};
