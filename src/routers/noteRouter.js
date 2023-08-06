// Import express and relevant controllers and middleware
import express from "express";
import { getUpload, postUpload, downloadNote } from "../controllers/noteController";
import { protectorMiddleware, noteUpload } from "../middlewares";

// Declare router for handling note-related routes
const noteRouter = express.Router();

// Define routes for note upload, applying protectorMiddleware, and specifying get and post methods
noteRouter
  .route("/:id([0-9a-f]{24})/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(noteUpload.single("note"), postUpload);
// Define route for downloading a note
noteRouter.get("/:id([0-9a-f]{24})/download", downloadNote);

// Export noteRouter
export default noteRouter;
