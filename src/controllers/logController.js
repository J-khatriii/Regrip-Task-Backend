import prisma from "../lib/prisma.js";

export const getLogs = async (req, res, next) => {
    try {
        const logs = await prisma.activityLog.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: "desc" },
        });

        res.json({ success : true, data: logs });
    } catch (error) {
        next(error);
    }
}
