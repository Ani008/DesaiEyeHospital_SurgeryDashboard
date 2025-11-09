import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import surgeriesRoutes from "./routes/surgeries.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());


// Base route for testing
app.get("/", (req, res) => {
  res.send("Desai Hospital Surgery Dashboard API is running 🚀");
});

// Surgeries API routes
app.use("/api/surgeries", surgeriesRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
