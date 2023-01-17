// Import express
import express from "express";
import {remove, edit} from "../controllers/userController";

// Declare router
const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

// Export userRouter
export default userRouter;