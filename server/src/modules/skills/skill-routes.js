const router = require("express").Router();

const {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill
} = require("./skill.controller");

const auth = require("../../middleware/auth.middleware");

// Public route (frontend portfolio)
router.get("/", getSkills);

// Protected routes (admin dashboard)
router.post("/", auth, createSkill);
router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);

module.exports = router;