// Import database
import "./db";

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

console.log(process.cwd());

// Create express application(server)
const app = express();

// Create logger middleware(development: GET, path, status code, etc.)
// Middleware is informing console website user would like to go
const logger = morgan("dev");

// Set pug as view engine to return html
app.set("view engine", "pug");
// Set default value
app.set("views", process.cwd() + "/src/views");

// Execute controller(middleware)
app.use(logger);

// Make express application understand transferred values of form
app.use(express.urlencoded({extended: true}));

// Set router
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// Server is listening port 4000
const handleListening = () => 
  console.log(`✅ Sever listeing on http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening)
