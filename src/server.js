// Import express
import express from "express";

// Import morgan
import morgan from "morgan";

// Set the PORT as 4000
const PORT = 4000;

// Create express application(server)
const app = express();

// Create logger middleware(development: GET, path, status code, etc.)
// Middleware is informing console website user would like to go
const logger = morgan("dev");

// Create home website
const home = (req, res) => {
  return res.send("hello");
};

// Create login website
const login = (req, res) => {
  return res.send("login");
};

// Execute controller(middleware)

app.use(logger);
// Add route
app.get("/", home);
app.get("/login", login);

// Server is listening port 4000
const handleListening = () => 
  console.log(`Sever listeing on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening)
