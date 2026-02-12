import rateLimit from "express-rate-limit";
import { success } from "zod";

/*  OTP rate limiter
    Max 3 request per 10 minutes
*/

export const otpRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 3,
    message: {
        success: false,
        message: "Too many OTP requests. Please try again after 10 minutes.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/*  Api rate limiter
    Max 100 request per 15 minutes
*/

export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});
