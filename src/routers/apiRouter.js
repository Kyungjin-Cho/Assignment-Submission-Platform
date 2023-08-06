// Import express to create the router
import express from "express";
// Import controllers related to video views and comments
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";

// Initialize the express router
const apiRouter = express.Router();

// Route to handle registering a view for a video with specific ID
apiRouter.post("/videos/:id([0-9a-z]{24})/view", registerView);
// Route to handle creating a comment for a video with specific ID
apiRouter.post("/videos/:id([0-9a-z]{24})/comment", createComment);
// Route to handle deleting a comment with specific ID
apiRouter.delete("/comments/:id([0-9a-z]{24})/delete", deleteComment);

// Export the router
export default apiRouter;
