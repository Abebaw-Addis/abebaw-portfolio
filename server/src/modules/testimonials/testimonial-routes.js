import express from "express";
const router = express.Router();

import {
    createTestimonial,
    deleteTestimonial,
    getTestimonials,
    updateTestimonial,
    uploadTestimonialImage,
} from "./testimonial-controller.js";

import auth from "../../middleware/auth-middleware.js";

router.get("/", getTestimonials);
router.post("/", auth, uploadTestimonialImage.single("avatar"), createTestimonial);
router.put("/:id", auth, uploadTestimonialImage.single("avatar"), updateTestimonial);
router.delete("/:id", auth, deleteTestimonial);

export default router;
