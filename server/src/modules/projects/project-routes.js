import express from "express";
const router = express.Router();

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  uploadProjectImages
} from "./project-controller.js";

import auth from "../../middleware/auth-middleware.js";

// Public route (frontend portfolio)
router.get("/", getProjects);

// Protected routes (admin dashboard)
router.post("/", auth, uploadProjectImages.single('image'), createProject);
router.put("/:id", auth, uploadProjectImages.single('image'), updateProject);
router.delete("/:id", auth, deleteProject);

export default router;
