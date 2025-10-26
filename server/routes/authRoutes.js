import express from "express";

import {
  registerUser,
  getAllUsers,
  loginUser,
} from "../controllers/authController.js";

import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/allUsers", isLoggedIn, getAllUsers);
router.post("/login", loginUser);

export default router;
