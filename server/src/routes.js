import authRoutes from "./modules/auth/auth-routes.js";
import contactRoutes from "./modules/contact/contact-routes.js";
import profileRoutes from "./modules/profile/profile-routes.js";
import projectRoutes from "./modules/projects/project-routes.js";
import skillRoutes from "./modules/skills/skill-routes.js";
import uploadRoutes from "./modules/upload/upload-routes.js";

import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio API Running"
    });
});

// Register
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/skills", skillRoutes);
router.use("/contact", contactRoutes);
router.use("/projects", projectRoutes);
router.use("/upload", uploadRoutes);

export default router;
