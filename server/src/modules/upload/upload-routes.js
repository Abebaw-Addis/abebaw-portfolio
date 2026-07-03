import express from "express";
import multer from "multer";
import auth from "../../middleware/auth-middleware.js";
import { uploadImage } from "./upload-controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/", auth, upload.single("file"), uploadImage);

export default router;
