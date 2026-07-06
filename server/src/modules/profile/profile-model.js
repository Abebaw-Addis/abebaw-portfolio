import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    },

    value: [{
      type: String,
      required: true
    },
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Profile", profileSchema);