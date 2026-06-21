const Profile = require("./profile.model");

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
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