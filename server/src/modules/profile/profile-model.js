const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    bio: String,

    email: String,

    phone: String,

    github: String,

    linkedin: String,

    profileImage: String,

    resumeUrl: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Profile",
  profileSchema
);