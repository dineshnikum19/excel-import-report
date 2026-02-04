import { Router } from "express";
import { uploadExcel } from "../controllers/upload.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

// Accept any single file field name (file, excel, document, etc.)
router.post(
  "/",
  upload.any(),
  (req, res, next) => {
    if (req.files?.length > 1) {
      return res.status(400).json({ error: "Only one file allowed" });
    }
    req.file = req.files?.[0] ?? null;
    next();
  },
  uploadExcel
);

export default router;
