import express from "express";
const router = express.Router();

import {
    createSkill,
    deleteSkill,
    getSkills,
    updateSkill,
    uploadSkillIcon,
} from "./skill-controller.js";

import auth from "../../middleware/auth-middleware.js";

// Public route (frontend portfolio)
router.get("/", getSkills);

// Protected routes (admin dashboard)
router.post("/", auth, uploadSkillIcon.single("icon"), createSkill);
router.put("/:id", auth, uploadSkillIcon.single("icon"), updateSkill);
router.delete("/:id", auth, deleteSkill);

export default router;
