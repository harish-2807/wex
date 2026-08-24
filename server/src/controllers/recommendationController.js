const recommendationService = require('../services/recommendationService');
const { parseSkillsParam } = require('../utils');

async function recommend(req, res) {
  try {
    const skills = parseSkillsParam(req.query.skills);
    if (skills.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one skill is required' });
    }

    const data = await recommendationService.recommend(skills, 20);
    res.json({ success: true, data });
  } catch (error) {
    console.error('recommend error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to generate recommendations' });
  }
}

module.exports = { recommend };
