import authRoutes from "./modules/auth/auth-routes.js";
import contactRoutes from "./modules/contact/contact-routes.js";
import galleryRoutes from "./modules/gallery/gallery-routes.js";
import profileRoutes from "./modules/profile/profile-routes.js";
import projectRoutes from "./modules/projects/project-routes.js";
import skillRoutes from "./modules/skills/skill-routes.js";
import testimonialRoutes from "./modules/testimonials/testimonial-routes.js";

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
router.use("/gallery", galleryRoutes);
router.use("/testimonials", testimonialRoutes);

export default router;
