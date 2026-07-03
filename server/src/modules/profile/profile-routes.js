import express from "express";
const router = express.Router();

import {
  getProfile,
  updateProfile
} from "./profile-controller.js";

router.get("/", getProfile);
router.put("/", updateProfile);

export default router;