const skillService = require('../services/skillService');

async function listSkills(req, res) {
  try {
    const data = await skillService.getAll();
    res.json({ success: true, data });
  } catch (error) {
    console.error('listSkills error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve skills' });
  }
}

async function getSkill(req, res) {
  try {
    const skill = await skillService.getById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    console.error('getSkill error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve skill' });
  }
}

async function listRelatedSkills(req, res) {
  try {
    const skill = await skillService.getById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    const data = await skillService.getRelated(req.params.id, 20);
    res.json({ success: true, data });
  } catch (error) {
    console.error('listRelatedSkills error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve related skills' });
  }
}

module.exports = { listSkills, getSkill, listRelatedSkills };
