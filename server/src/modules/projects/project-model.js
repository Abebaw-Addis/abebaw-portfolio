import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
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

    technologies: {
      type: [String],
      default: []
    },

    github: {
      type: String,
      default: ""
    },

    live: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    featured: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
