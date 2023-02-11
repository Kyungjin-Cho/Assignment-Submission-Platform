// Initilize everything

// Import database
import "./db";

// Import video model
import "./models/Video";

// Import app
import app from "./server";

// Set the PORT as 4000
const PORT = 4000;

// Server is listening port 4000
const handleListening = () => 
  console.log(`✅ Sever listeing on http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening)