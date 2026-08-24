const jobService = require('../services/jobService');
const { parseSkillsParam } = require('../utils');

async function listJobs(req, res) {
  try {
    const data = await jobService.getAll();
    res.json({ success: true, data });
  } catch (error) {
    console.error('listJobs error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve jobs' });
  }
}

async function getJob(req, res) {
  try {
    const job = await jobService.getById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: job });
  } catch (error) {
    console.error('getJob error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve job' });
  }
}

async function missingSkills(req, res) {
  try {
    const job = await jobService.getById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const skills = parseSkillsParam(req.query.skills);
    const data = await jobService.getMissingSkills(req.params.id, skills);
    const matched = skills.filter((s) => data.includes(s));
    const missing = data.filter((s) => !skills.includes(s));

    res.json({ success: true, data: { jobId: req.params.id, matchedSkills: matched, missingSkills: missing } });
  } catch (error) {
    console.error('missingSkills error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve missing skills' });
  }
}

module.exports = { listJobs, getJob, missingSkills };
