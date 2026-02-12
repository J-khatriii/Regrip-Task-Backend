import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import logActivity from "../utils/activityLogger.js";

export const requestOTP = async (req, res, next) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otpCode, 10);

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 Minutes

        let user = await prisma.user.findUnique({ where : { email } });

        if(!user) {
            user = await prisma.user.create({ data: { email } });
        }

        await prisma.otp.create({
            data: {
                email,
                code: hashedOtp,
                expiresAt,
                userId: user.id,
            },
        });

        console.log("OTP: ", otpCode);

        await logActivity(
            null,
            "OTP_Requested",
            { email },
        );

        res.json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        next(error);
    }
}

export const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if(!email || !otp) {
            return res.status(400).json({ message: "Email and OTP required" });
        }

        const record = await prisma.otp.findFirst({
            where: {
                email,
                used: false,
                expiresAt: { gt: new Date() },
            },
            orderBy : { createdAt: "desc" }
        });
        
        if(!record) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const isValid = await bcrypt.compare(otp, record.code);

        if(!isValid) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        await prisma.otp.update({
            where: { id: record.id },
            data: { used: true },
        });

        const token = jwt.sign(
            { userId : record.userId },
            process.env.JWT_SECRET,
            {expiresIn: "1h"},
        );

        const user = await prisma.user.findUnique({
            where: { id: record.userId },
        });

        await logActivity(
            user.id,
            "LOGIN_Success",
            { email },
        );

        res.json({ success: true, accessToken: token });
    } catch (error) {
        next(error);
    }
}
