import express from "express";
import isAuthenticated from "../middlewares/auth";
import { getTextReport } from "../controllers/userController";

const router = express.Router();

router.get("/report", isAuthenticated, getTextReport);


export default router;

