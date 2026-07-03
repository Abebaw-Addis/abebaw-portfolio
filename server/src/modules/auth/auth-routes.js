import express from "express";
const router = express.Router();

import {
  register,
  login,
  me
} from "./auth-controller.js";

import authMiddleware from "../../middleware/auth-middleware.js";

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

export default router;
