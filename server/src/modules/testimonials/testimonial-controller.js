import { deleteFromCloudinary } from "../../utils/cloudinaryDeleteHelper.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUploadHelper.js";
import { createUpload } from "../../utils/multerHelper.js";
import Testimonial from "./testimonial-model.js";

export const uploadTestimonialImage = createUpload(undefined, {
  limits: { fileSize: 5 * 1024 * 1024 },
  allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
});

export const normalizeTestimonialPayload = async (req) => {
  const payload = { ...req.body };

  if (payload.name) payload.name = payload.name.trim();
  if (payload.role) payload.role = payload.role.trim();
  if (payload.company) payload.company = payload.company.trim();
  if (payload.relation) payload.relation = payload.relation.trim();
  if (payload.testimonial) payload.testimonial = payload.testimonial.trim();
  if (payload.email) payload.email = payload.email.trim();
  if (payload.phone) payload.phone = payload.phone.trim();
  if (payload.location) payload.location = payload.location.trim();
  if (payload.linkedin) payload.linkedin = payload.linkedin.trim();
  if (payload.website) payload.website = payload.website.trim();

  if (payload.featured !== undefined) {
    payload.featured = payload.featured === true || payload.featured === "true";
  }

  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file, "portfolio/testimonials", "image");
    payload.avatar = uploadResult.url;
  } else if (payload.avatar !== undefined && payload.avatar !== null) {
    payload.avatar = String(payload.avatar).trim();
  }

  return payload;
};

export const createTestimonial = async (req, res) => {
  try {
    const payload = await normalizeTestimonialPayload(req);
    const testimonial = await Testimonial.create(payload);

    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const { featured } = req.query;
    const query = featured === "true" ? { featured: true } : {};
    const testimonials = await Testimonial.find(query).sort({ featured: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const existingTestimonial = await Testimonial.findById(req.params.id);
    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const payload = await normalizeTestimonialPayload(req);

    if (req.file && existingTestimonial.avatar && existingTestimonial.avatar.startsWith("http")) {
      await deleteFromCloudinary(existingTestimonial.avatar);
    }

    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    if (testimonial.avatar && testimonial.avatar.startsWith("http")) {
      await deleteFromCloudinary(testimonial.avatar);
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Testimonial deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
