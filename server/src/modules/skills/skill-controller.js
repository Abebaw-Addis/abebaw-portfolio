const skillService = require("./skill.service");

exports.createSkill = async (req, res) => {
  try {
    const skill = await skillService.createSkill(req.body);

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

exports.getSkills = async (req, res) => {
  try {
    const { category } = req.query;

    let skills;

    if (category) {
      skills =
        await skillService.getSkillsByCategory(
          category
        );
    } else {
      skills = await skillService.getSkills();
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

exports.updateSkill = async (req, res) => {
  try {
    const skill =
      await skillService.updateSkill(
        req.params.id,
        req.body
      );

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

exports.deleteSkill = async (req, res) => {
  try {
    await skillService.deleteSkill(req.params.id);

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