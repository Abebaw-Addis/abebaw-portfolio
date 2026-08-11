import { deleteFromCloudinary } from "../../utils/cloudinaryDeleteHelper.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUploadHelper.js";
import { createUpload } from "../../utils/multerHelper.js";
import Project from "./project-model.js";

// Storage argument undefined as we set a default storage memory
export const uploadProjectImages = createUpload(undefined, {
  limits: { fileSize: 5 * 1024 * 1024 },
  allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
});

const parseList = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
};

export const createProject = async (req, res) => {
  try {

    let imageUrl = req.body.image || "";

    // Handle image upload to Cloudinary
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file,
        "portfolio/projects",
        "image"
      );

      imageUrl = uploadResult.url;
    }

    const technologies = parseList(req.body.technologies);
    const features = parseList(req.body.features);

    const project = await Project.create({
      ...req.body,
      technologies,
      features,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { category } = req.query;

    let projects;

    if (category) {
      projects =
        await Project.find({ category }).sort({ createdAt: -1 })
    } else {
      projects = await Project.find().sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const technologies = parseList(req.body.technologies);
    const features = parseList(req.body.features);

    req.body.technologies = technologies;
    req.body.features = features;

    // Handle image upload to Cloudinary if a new image is provided
    let imageUrl = req.body.image || existingProject.image;

    if (req.file) {
      if (existingProject.image) {
        await deleteFromCloudinary(existingProject.image);
      }

      const uploadResult = await uploadToCloudinary(
        req.file,
        "portfolio/projects",
        "image"
      );

      imageUrl = uploadResult.url;
    }

    req.body.image = imageUrl;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // Delete the image from Cloudinary if it exists
    if (project.image) {
      try {
        await deleteFromCloudinary(project.image);
      } catch (cloudinaryError) {
        console.error("Error deleting Cloudinary image:", cloudinaryError);
      }
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};