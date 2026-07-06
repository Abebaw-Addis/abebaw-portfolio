import multer from "multer";

// Default storage (memory storage)
const defaultStorage = multer.memoryStorage();

export const createUpload = (
  storage = defaultStorage,
  { limits, allowedTypes } = {}
) => {
  return multer({
    storage,
    limits: limits || { fileSize: 10 * 1024 * 1024 }, // default 10MB
    fileFilter: (req, file, cb) => {
      const allowed = allowedTypes || [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/webp",
      ];

      if (allowed.includes(file.mimetype)) {
        return cb(null, true);
      } else {
        return cb(new Error("Invalid file type. File type not allowed."), false);
      }
    },
  });
};
