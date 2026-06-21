const router = require("express").Router();

const {
  getProfile,
  updateProfile
} = require("./profile-controller");

router.get("/", getProfile);
router.put("/", updateProfile);

module.exports = router;