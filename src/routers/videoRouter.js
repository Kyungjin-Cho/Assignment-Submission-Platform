// Import express
import express from "express";
import {
  watch,
  getUpload,
  getEdit,
  postEdit,
  postUpload,
  deleteVideo,
  registerView,
  createComment,
  deleteComment
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

// Declare router
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postUpload);

videoRouter.post("/:id([0-9a-f]{24})/views", registerView);
videoRouter.post("/:id([0-9a-f]{24})/comment", protectorMiddleware, createComment);
videoRouter.delete("/comments/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteComment);

// Export videoRouter
export default videoRouter;
