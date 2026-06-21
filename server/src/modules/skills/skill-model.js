const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "AI/ML",
        "Cybersecurity",
        "DevOps",
        "Language",
        "Other"
      ]
    },

    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    icon: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);