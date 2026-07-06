import Profile from "./profile-model.js";
import { createUpload } from "../../utils/multerHelper.js";
import { uploadToCloudinary } from "../../utils/cloudinaryUploadHelper.js";

export const uploadProfileImage = createUpload(undefined, {
  limits: { fileSize: 10 * 1024 * 1024 },
  allowedTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
});

const normalizeProfilePayload = async (req) => {
  const payload = { ...req.body };

  if (req.file) {
    const uploadResult = await uploadToCloudinary(req.file, "portfolio/profile");
    payload.value = [uploadResult.url];
    payload.imageUrl = uploadResult.url;

    if (!payload.key || payload.key.trim() === "") {
      payload.key = "profileImage";
    }
  } else if (payload.value !== undefined) {
    payload.value = Array.isArray(payload.value) ? payload.value : [payload.value];
  }

  return payload;
};

export const createProfile = async (req, res) => {
  try {
    const payload = await normalizeProfilePayload(req);
    const profile = new Profile(payload);
    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const payload = await normalizeProfilePayload(req);
    const profile = await Profile.findOneAndUpdate(
      { _id: req.params.id },
      payload,
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ _id: req.params.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
