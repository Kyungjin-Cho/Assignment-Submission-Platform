// Import express
import express from "express";
import {see, edit, upload, deleteVideo} from "../controllers/videoController";

// Declare router
const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

// Export videoRouter
export default videoRouter;