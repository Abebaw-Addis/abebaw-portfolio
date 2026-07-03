import express from "express";
const router = express.Router();

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from "./project-controller.js";

import auth from "../../middleware/auth-middleware.js";

// Public route (frontend portfolio)
router.get("/", getProjects);

// Protected routes (admin dashboard)
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

export default router;
