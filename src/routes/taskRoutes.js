import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/taskController.js";
import { apiRateLimiter } from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

router.use(apiRateLimiter);

router.post("/", authenticate, createTask);
router.get("/", authenticate, getTask);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;
