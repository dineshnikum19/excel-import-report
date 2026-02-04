import { Router } from "express";
import {
  getBestHour,
  getWorstHour,
  getTrends,
} from "../controllers/analytics.controller.js";

const router = Router();

router.get("/best-hour", getBestHour);
router.get("/worst-hour", getWorstHour);

export default router;
