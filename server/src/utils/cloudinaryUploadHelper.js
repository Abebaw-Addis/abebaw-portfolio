import cloudinary from "../config/cloudinary.js";

//  Convert buffer → Base64 Data URI
const toDataUri = (file) => {
    const base64 = file.buffer.toString("base64");
    return `data:${file.mimetype};base64,${base64}`;
};

/**
 * Upload to Cloudinary
 * @param {File} file - Multer file object
 * @param {String} folder - Cloudinary folder
 * @param {"image"|"auto"} resourceType
 * @returns Cloudinary Upload Response (public_id, url, etc.)
 */
export const uploadToCloudinary = async (
    file,
    folder = "uploads",
    resourceType = "auto"
) => {
    if (!file) throw new Error("No file provided");

    const dataUri = toDataUri(file);

    const result = await cloudinary.uploader.upload(dataUri, {
        folder,
        resource_type: resourceType,
    });

    return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        resourceType: result.resource_type,
    };
};