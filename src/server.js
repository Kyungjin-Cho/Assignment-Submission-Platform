// Import express
import express from "express";

// Import morgan
import morgan from "morgan";

// Import routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// Set the PORT as 4000
const PORT = 4000;

// Create express application(server)
const app = express();

// Create logger middleware(development: GET, path, status code, etc.)
// Middleware is informing console website user would like to go
const logger = morgan("dev");

// Execute controller(middleware)
app.use(logger);

// Set router
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// Server is listening port 4000
const handleListening = () => 
  console.log(`Sever listeing on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening)
