const Skill = require("./skill-model");

exports.createSkill = async (data) => {
  return await Skill.create(data);
};

exports.getSkills = async () => {
  return await Skill.find().sort({ level: -1 });
};

exports.getSkillsByCategory = async (category) => {
  return await Skill.find({ category }).sort({ level: -1 });
};

exports.updateSkill = async (id, data) => {
  return await Skill.findByIdAndUpdate(id, data, {
    new: true
  });
};

exports.deleteSkill = async (id) => {
  return await Skill.findByIdAndDelete(id);
};