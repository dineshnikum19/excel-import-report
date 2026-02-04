import express from "express";
import { uploadExcel } from "../middleware/upload.js";
import { uploadStoreExcel } from "../controllers/storeController.js";

const router = express.Router();

router.post("/upload", uploadExcel, uploadStoreExcel);

export default router;
