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

// Print out the cookie
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

// Create a new URL to return session ID
app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id} ${req.session.potato}`);
});

// Set router
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
