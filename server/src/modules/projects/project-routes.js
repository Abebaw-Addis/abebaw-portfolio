const router = require("express").Router();

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require("./project-controller");

const auth = require("../../middleware/auth-middleware");

// Public route (frontend portfolio)
router.get("/", getProjects);

// Protected routes (admin dashboard)
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

module.exports = router;