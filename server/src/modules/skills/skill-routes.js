import express from "express";
const router = express.Router();

import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill
} from "./skill-controller.js";

import auth from "../../middleware/auth-middleware.js";

// Public route (frontend portfolio)
router.get("/", getSkills);

// Protected routes (admin dashboard)
router.post("/", auth, createSkill);
router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);

export default router;
