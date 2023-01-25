// Import express
import express from "express";
import {remove, edit, logout, see} from "../controllers/userController";

// Declare router
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id", see);

// Export userRouter
export default userRouter;