// Import express
import express from "express";

// Set the PORT as 4000
const PORT = 4000;

// Create express application(server)
const app = express();

// Create controller(middleware) and execute it
// Middleware is informing console website user would like to go
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Create handler and execute it
const handleHome = (req, res) => {
  // Send request
  return res.send("I have the power now!");
};

// Add route
app.get("/", logger, handleHome);

// Server is listening port 4000
const handleListening = () => console.log(`Sever listeing on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening)
