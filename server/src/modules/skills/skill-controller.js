import Skill from "./skill-model.js";

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getSkills = async (req, res) => {
  try {
    const { category } = req.query;

    let skills;

    if (category) {
      skills =
        await Skill.find({ category });
    } else {
      skills = await Skill.find().sort({ level: -1 });
    }

    res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill =
      await Skill.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });

    res.status(200).json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Skill deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};