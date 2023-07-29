import express from "express";
import {
  getUpload, 
  postUpload, 
  downloadNote
} from "../controllers/noteController";
import { protectorMiddleware, noteUpload } from "../middlewares";

const noteRouter = express.Router();

noteRouter
  .route("/:id([0-9a-f]{24})/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(noteUpload.single("note"), postUpload);
noteRouter.get("/:id([0-9a-f]{24})/download", downloadNote);

export default noteRouter;
