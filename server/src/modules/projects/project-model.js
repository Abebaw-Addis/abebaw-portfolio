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

    category: {
      type: String,
      default: "Other",
      trim: true
    },

    role: {
      type: String,
      default: "",
      trim: true
    },

    duration: {
      type: String,
      default: "",
      trim: true
    },

    year: {
      type: Number,
      default: null,
      min: 1900,
      max: 2100
    },

    status: {
      type: String,
      default: "Completed",
      trim: true
    },

    technologies: {
      type: [String],
      default: []
    },

    features: {
      type: [String],
      default: []
    },

    challenges: {
      type: String,
      default: "",
      trim: true
    },

    outcome: {
      type: String,
      default: "",
      trim: true
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
