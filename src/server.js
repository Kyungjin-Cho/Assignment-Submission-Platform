// Import express
import express from "express";

// Import morgan
import morgan from "morgan";

// Import express-session
import session from "express-session";

// Import Mongo Store
import MongoStore from "connect-mongo";

// Import routers
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

// Create express application(server)
// const express = require('express');
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
    // String of the text when we sign the cookie
    secret: process.env.COOKIE_SECRET,
    // Save session only if there's any change
    resave: false,
    // Don't save any uninitialized session
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}

// Set router
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use(ignoreFavicon);

export default app;
