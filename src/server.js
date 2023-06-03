// Import express
import express from "express";

// Import morgan
import morgan from "morgan";

// Import express-session
import session from "express-session";

// Import routers
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

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

// Make server to provide cookie to browser
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);

// Set router
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
