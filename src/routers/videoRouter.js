// Import express
import express from "express";
import {watch, getEdit, postEdit, upload, deleteVideo} from "../controllers/videoController";

// Declare router
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.post("/:id(\\d+)/edit", postEdit);

// Export videoRouter
export default videoRouter;