const { driver } = require('../config/db');
const { jobMissingSkills, careerPaths, mapMissingSkills, mapCareerPath } = require('../queries/careerPathQueries');

async function missingSkillsForJob(id, skills) {
  const session = driver.session();
  try {
    const result = await session.run(jobMissingSkills, { id, skills });
    if (result.records.length === 0) return null;
    return mapMissingSkills(result.records[0]);
  } finally {
    await session.close();
  }
}

async function careerPathsForSkills(skills, limit = 20) {
  const session = driver.session();
  try {
    const result = await session.run(careerPaths, { skills, limit });
    return result.records.map(mapCareerPath);
  } finally {
    await session.close();
  }
}

module.exports = { missingSkillsForJob, careerPathsForSkills };
