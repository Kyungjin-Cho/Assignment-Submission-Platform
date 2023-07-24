import express from "express";
import { postAddNote } from "../controllers/noteController";
import { protectorMiddleware } from "../middlewares";

const noteRouter = express.Router();

noteRouter.route("/:id([0-9a-f]{24})").post(protectorMiddleware, postAddNote);

export default noteRouter;
