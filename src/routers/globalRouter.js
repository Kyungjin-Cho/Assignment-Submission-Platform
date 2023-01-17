// Import express
import express from "express";
import {join} from "../controllers/userController";
import {trending} from "../controllers/videoController";

// Declare router
const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join)

// Export globalRouter
export default globalRouter;