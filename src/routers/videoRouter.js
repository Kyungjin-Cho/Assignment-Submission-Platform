// Import express
import express from "express";
import {watch, edit} from "../controllers/videoController";

// Declare router
const videoRouter = express.Router();

videoRouter.get("/watch", watch);
videoRouter.get("/edit", edit);

// Export videoRouter
export default videoRouter;