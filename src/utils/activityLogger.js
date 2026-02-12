import prisma from "../lib/prisma.js";

const logActivity = async (userId, action, metadata ) => {
    try {
        await prisma.activityLog.create({
            data: {
                userId, 
                action,
                metadata,
            }
        });
    } catch (error) {
        console.error("Failed to log activity", error.message);
    }
}

export default logActivity;
