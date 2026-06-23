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
router.use("/contact", require("../modules/contact/contact-routes"));
router.use("/projects", require("../modules/projects/project-routes"));

module.exports = router;