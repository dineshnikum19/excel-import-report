import { Router } from "express";
import {
  listStores,
  getStore,
  createStore,
} from "../controllers/store.controller.js";

const router = Router();

router.get("/", listStores);
router.get("/:id", getStore);
router.post("/", createStore);

export default router;
