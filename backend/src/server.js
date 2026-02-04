import "./config/env.js";
import { connectDB } from "./config/db.js";
import express from "express";

import uploadRoutes from "./routes/upload.routes.js";
import storeRoutes from "./routes/store.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/health", (req, res) => res.json({ ok: true }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();

export default app;
