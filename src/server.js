import express from "express";
import "dotenv/config";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { authenticate } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));

app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.get("/api/protected", authenticate, (req, res) => {
    return res.json({ messgae: "You are authenticated", user: req.user });
});
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
