// Import monguse
import mongoose from "mongoose";

// Set option of strictQuery
mongoose.set("strictQuery", true);

// Connect to database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

// Set variable to check app is connected to database
const db = mongoose.connection;

// Print out the connection status on console
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

// Handle status of handleOpen and handleError
db.on("error", handleError);
db.once("open", handleOpen);