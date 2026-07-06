import { deleteFromCloudinary } from "../../utils/cloudinaryDeleteHelper.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUploadHelper.js";
import { createUpload } from "../../utils/multerHelper.js";
import Gallery from "./gallery-model.js";

// Storage argument undefined as we set a default storage memory
export const uploadGalleryImages = createUpload(undefined, {
  limits: { fileSize: 5 * 1024 * 1024 },
  allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
});

export const createGallery = async (req, res) => {
  try {

    let imageUrl = req.body.image || "";

    // Handle image upload to Cloudinary
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file,
        "portfolio/gallery",
        "image"
      );

      imageUrl = uploadResult.url;
    }

    const gallery = await Gallery.create({
      ...req.body,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getGalleries = async (req, res) => {
  try {
    const { category } = req.query;

    let galleries;

    if (category) {
      galleries =
        await Gallery.find({ category }).sort({ createdAt: -1 })
    } else {
      galleries = await Gallery.find().sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      data: galleries
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const existingGallery = await Gallery.findById(req.params.id);
    if (!existingGallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found"
      });
    }

    // Handle image upload to Cloudinary if a new image is provided
    let imageUrl = req.body.image || existingGallery.image;

    if (req.file) {
      if (existingGallery.image) {
        await deleteFromCloudinary(existingGallery.image);
      }

      const uploadResult = await uploadToCloudinary(
        req.file,
        "portfolio/gallery",
        "image"
      );

      imageUrl = uploadResult.url;
    }

    req.body.image = imageUrl;

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: gallery
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found"
      });
    }

    // Delete the image from Cloudinary if it exists
    if (gallery.image) {
      try {
        await deleteFromCloudinary(gallery.image);
      } catch (cloudinaryError) {
        console.error("Error deleting Cloudinary image:", cloudinaryError);
      }
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gallery deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};