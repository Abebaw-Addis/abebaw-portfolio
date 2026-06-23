const Project = require("./project-model");

exports.createProject = async (data) => {
  return await Project.create(data);
};

exports.getProjects = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

exports.getProjectsByCategory = async (category) => {
  return await Project.find({ category }).sort({ createdAt: -1 });
};

exports.updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, {
    new: true
  });
};

exports.deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};