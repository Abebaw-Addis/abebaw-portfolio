import express from "express";
const router = express.Router();

import {
  createGallery,
  getGalleries,
  updateGallery,
  deleteGallery,
  uploadGalleryImages
} from "./gallery-controller.js";

import auth from "../../middleware/auth-middleware.js";

// Public route (frontend portfolio)
router.get("/", getGalleries);

// Protected routes (admin dashboard)
router.post("/", auth, uploadGalleryImages.single('image'), createGallery);
router.put("/:id", auth, uploadGalleryImages.single('image'), updateGallery);
router.delete("/:id", auth, deleteGallery);

export default router;
