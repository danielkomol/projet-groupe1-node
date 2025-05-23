import express from "express";
import {
  register,
  login,
  refreshToken,
  updateUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js"; // Fix path

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.put("/users/:id", authenticate, updateUser);

export default router;
