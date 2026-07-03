import Skill from "./skill-model.js";

export const createSkill = async (data) => {
  console.log(data);
  return await Skill.create(data);
};

export const getSkills = async () => {
  return await Skill.find().sort({ level: -1 });
};

export const getSkillsByCategory = async (category) => {
  return await Skill.find({ category }).sort({ level: -1 });
};

export const updateSkill = async (id, data) => {
  return await Skill.findByIdAndUpdate(id, data, {
    new: true
  });
};

export const deleteSkill = async (id) => {
  return await Skill.findByIdAndDelete(id);
};