const careerPathService = require('../services/careerPathService');
const opportunityService = require('../services/opportunityService');
const { parseSkillsParam } = require('../utils');

async function careerPaths(req, res) {
  try {
    const skills = parseSkillsParam(req.query.skills);
    if (skills.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one skill is required' });
    }

    const data = await careerPathService.careerPathsForSkills(skills, 20);
    res.json({ success: true, data });
  } catch (error) {
    console.error('careerPaths error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to generate career paths' });
  }
}

async function opportunities(req, res) {
  try {
    const skills = parseSkillsParam(req.query.skills);
    if (skills.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one skill is required' });
    }

    const data = await opportunityService.findOpportunities(skills);
    res.json({ success: true, data });
  } catch (error) {
    console.error('opportunities error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to generate opportunities' });
  }
}

module.exports = { careerPaths, opportunities };
