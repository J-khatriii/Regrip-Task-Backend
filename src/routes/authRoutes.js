import express from "express";
import { requestOTP, verifyOTP } from "../controllers/authController.js";
import { otpRateLimiter } from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

router.post("/request-otp", otpRateLimiter, requestOTP);
router.post("/verify-otp", otpRateLimiter, verifyOTP);

export default router;
