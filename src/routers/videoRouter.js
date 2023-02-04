// Import express
import express from "express";
import {watch, getEdit, postEdit, getUpload, postUpload} from "../controllers/videoController";

// Declare router
const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

// Export videoRouter
export default videoRouter;