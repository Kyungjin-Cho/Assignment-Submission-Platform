// Import express
import express from "express";

// Declare router
const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handleEditUser);

// Export userRouter
export default userRouter;