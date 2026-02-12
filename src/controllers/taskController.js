import prisma from "../lib/prisma.js";
import logActivity from "../utils/activityLogger.js";

export const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        if(!title) {
            return res.status(400).json({ success : false, message: "Title is required" });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                userId: req.user.id,
            },
        });

        await logActivity(
            req.user.id,
            "Task_Created",
            { taskId: task.id },
        );

        res.status(201).json({ success : true, data: task });
    } catch (err) {
        next(err);
    }
}

export const getTask = async (req, res, next) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId : req.user.id },
            orderBy: { createdAt : "desc" },
        });

        res.json({ success : true, data: tasks });
    } catch (err) {
        next(err);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await prisma.task.findUnique({
            where: { id },
        });

        if(!task || task.userId !== req.user.id) {
            return res.status(400).json({ success : false, message: "Task not found" });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                title,
                description,
                status,
            },
        });
        
        await logActivity(
            req.user.id,
            "Task_Updated",
            { 
                taskId: task.id,
                updatedFields: Object.keys(req.body),
            },
        );

        res.json({ success : true, data: updatedTask });
    } catch (err) {
        next(err);        
    }
}

export const deleteTask = async (req, res, next) => {
    try {
       const { id } = req.params;
       
       const task = await prisma.task.findUnique({
        where: { id },
       });

       if(!task || task.userId !== req.user.id) {
        return res.status(400).json({ success : false, message: "Task not found" });
       }

       await prisma.task.delete({
        where: { id },
       });

       await logActivity(
            req.user.id,
            "Task_Deleted",
            { taskId: id },
        );

       res.json({ success : true, message: "Task deleted successfully" });
    } catch (err) {
        next(err);        
    }
}
