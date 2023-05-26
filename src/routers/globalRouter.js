// Import express
import express from "express";
import {join, login} from "../controllers/userController";
import {home, search} from "../controllers/videoController";

// Declare router
const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

// Export globalRouter
export default globalRouter;