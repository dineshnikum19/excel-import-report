import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import storeRoutes from "./routes/storeRoutes.js";

dotenv.config();

const app = express();

// --------------------
// Middlewares
// --------------------
app.use(cors());
app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form-data (non-file fields)

// --------------------
// Routes
// --------------------
app.use("/api/stores", storeRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// --------------------
// Error Handler (basic)
// --------------------
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  // Multer errors (e.g. Unexpected field, size limits)
  if (err?.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large (max 5MB)" });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ message: "Only one file is allowed" });
    }
    return res.status(400).json({ message: err.message });
  }

  // Custom upload filter errors
  if (err?.message?.includes("Only Excel files")) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: err.message || "Something went wrong" });
});

// --------------------
// MongoDB Connection
// --------------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err?.code === "EADDRINUSE") {
      const nextPort = Number(port) + 1;
      console.error(
        `⚠️ Port ${port} is already in use. Retrying on ${nextPort}...`
      );
      setTimeout(() => startServer(nextPort), 300);
      return;
    }
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  });
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    startServer(PORT);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
