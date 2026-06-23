const projectService = require("./project-service");

exports.createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const { category } = req.query;

    let projects;

    if (category) {
      projects =
        await projectService.getProjectsByCategory(
          category
        );
    } else {
      projects = await projectService.getProjects();
    }

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project =
      await projectService.updateProject(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await projectService.deleteProject(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};