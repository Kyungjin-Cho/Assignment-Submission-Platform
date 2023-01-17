// Import express
import express from "express";

// Declare router
const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

export default globalRouter;