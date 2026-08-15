import { deleteFromCloudinary } from "../../utils/cloudinaryDeleteHelper.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUploadHelper.js";
import { createUpload } from "../../utils/multerHelper.js";
import Skill from "./skill-model.js";

export const uploadSkillIcon = createUpload(undefined, {
  limits: { fileSize: 5 * 1024 * 1024 },
  allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/svg+xml"],
});

export const normalizeSkillPayload = async (req) => {
  const payload = { ...req.body };

  const level = Number(payload.level);
  if (!Number.isNaN(level)) {
    payload.level = Math.min(100, Math.max(0, level));
  }

  if (payload.name) {
    payload.name = payload.name.trim();
  }

  if (payload.category) {
    payload.category = payload.category.trim();
  }

  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file, "portfolio/skills", "image");
    payload.icon = uploadResult.url;
  } else if (payload.icon !== undefined && payload.icon !== null) {
    payload.icon = String(payload.icon).trim();
  }

  return payload;
};

export const createSkill = async (req, res) => {
  try {
    const payload = await normalizeSkillPayload(req);
    const skill = await Skill.create(payload);

    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSkills = async (req, res) => {
  try {
    const { category } = req.query;

    let skills;

    if (category) {
      skills = await Skill.find({ category });
    } else {
      skills = await Skill.find().sort({ level: -1 });
    }

    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const existingSkill = await Skill.findById(req.params.id);
    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    const payload = await normalizeSkillPayload(req);

    if (req.file && existingSkill.icon && existingSkill.icon.startsWith("http")) {
      await deleteFromCloudinary(existingSkill.icon);
    }

    const skill = await Skill.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    if (skill.icon && skill.icon.startsWith("http")) {
      await deleteFromCloudinary(skill.icon);
    }

    await Skill.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Skill deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};