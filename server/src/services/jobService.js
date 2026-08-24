const { driver } = require('../config/db');
const { getAllJobs, getJobById, getJobRequirements, mapJobRecord } = require('../queries/jobQueries');

async function getAll() {
  const session = driver.session();
  try {
    const result = await session.run(getAllJobs);
    return result.records.map(mapJobRecord);
  } finally {
    await session.close();
  }
}

async function getById(id) {
  const session = driver.session();
  try {
    const result = await session.run(getJobById, { id });
    if (result.records.length === 0) return null;
    return mapJobRecord(result.records[0]);
  } finally {
    await session.close();
  }
}

async function getMissingSkills(id, skills) {
  const session = driver.session();
  try {
    const result = await session.run(getJobRequirements, { id, skills });
    return result.records.map((rec) => rec.get('name'));
  } finally {
    await session.close();
  }
}

module.exports = { getAll, getById, getMissingSkills };
