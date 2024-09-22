import { Router } from "express";
import {
  deleteText,
  readText,
  readTextById,
  updateText,
  writeText,
} from "../controllers/textController";
import isAuthenticated from "../middlewares/auth";

const router = Router();

router.post("/text", isAuthenticated, writeText);
router.get("/text", readText);
router.get("/text/:id", readTextById);
router.put("/text/:id", isAuthenticated, updateText);
router.delete("/text/:id", isAuthenticated, deleteText);

export default router;
