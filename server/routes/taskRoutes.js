import express from "express";

import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();
router.use(isLoggedIn);
router.get("/", getTasks);
router.post("/", addTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
