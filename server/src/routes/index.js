const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API Running"
  });
});

// Register
router.use("/auth", require("../modules/auth/auth-routes"));
router.use("/profile", require("../modules/profile/profile-routes"));
router.use("/skills", require("../modules/skills/skill-routes"));

module.exports = router;