import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT;

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});
