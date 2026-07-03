import Project from "./project-model.js";

export const createProject = async (data) => {
  return await Project.create(data);
};

export const getProjects = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

export const getProjectsByCategory = async (category) => {
  return await Project.find({ category }).sort({ createdAt: -1 });
};

export const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, {
    new: true
  });
};

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};