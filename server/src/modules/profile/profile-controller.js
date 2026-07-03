import Profile from "./profile-model.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true
      }
    );

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
