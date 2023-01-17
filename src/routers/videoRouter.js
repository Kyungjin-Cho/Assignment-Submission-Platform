// Import express
import express from "express";

// Declare router
const videoRouter = express.Router();

const handleWatchVideo = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", handleWatchVideo);

// Export videoRouter
export default videoRouter;