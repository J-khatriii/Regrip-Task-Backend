import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { getLogs } from "../controllers/logController.js";

const router = express.Router();

router.get("/", authenticate, getLogs);

export default router;
