// Import express
import express from "express";
import {see, edit, upload, deleteVideo} from "../controllers/videoController";

// Declare router
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

// Export videoRouter
export default videoRouter;