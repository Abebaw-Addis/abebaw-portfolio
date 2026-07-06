import express from "express";
const router = express.Router();

import {
  createProfile,
  deleteProfile,
  getProfile,
  getProfiles,
  updateProfile,
  uploadProfileImage,
} from "./profile-controller.js";
import auth from "../../middleware/auth-middleware.js";

router.get("/:id", getProfile);
router.get("/", getProfiles);
router.post("/", auth, uploadProfileImage.single("image"), createProfile);
router.put("/:id", auth, uploadProfileImage.single("image"), updateProfile);
router.delete("/:id", auth, deleteProfile);

export default router;