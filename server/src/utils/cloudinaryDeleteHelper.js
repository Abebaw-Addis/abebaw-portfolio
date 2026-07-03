import cloudinary from "../config/cloudinary.js";

/**
 * Delete an image from Cloudinary
 * Supports both full URL and public_id inputs.
 *
 * @param {string} identifier - Cloudinary URL or public_id
 * @returns {Promise<object>} Cloudinary delete response
 */
export const deleteFromCloudinary = async (identifier) => {
  try {
    if (!identifier) return { result: "no_identifier" };

    let publicId = identifier;

    /**
     * If identifier is a URL, extract the public_id using regex.
     * Example URL:
     * https://res.cloudinary.com/xxx/image/upload/v123/folder/name.jpg
     */
    if (identifier.startsWith("http")) {
      const regex = /\/upload\/(?:v\d+\/)?(.+?)(\.[a-zA-Z0-9]+)?$/;
      const match = identifier.match(regex);

      if (!match || !match[1]) {
        throw new Error("Invalid Cloudinary URL format.");
      }

      publicId = match[1];
    }

    console.log("🗑️ Deleting Cloudinary resource:", publicId);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true, // ensures old CDN versions are cleared
    });

    console.log("Cloudinary delete result:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    return { result: "error", error: error.message };
  }
};