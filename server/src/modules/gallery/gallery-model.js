import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
