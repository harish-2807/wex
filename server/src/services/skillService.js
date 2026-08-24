const { driver } = require('../config/db');
const { getAllSkills, getSkillById, getRelatedSkills, mapSkill } = require('../queries/skillQueries');

async function getAll() {
  const session = driver.session();
  try {
    const result = await session.run(getAllSkills);
    return result.records.map(mapSkill);
  } finally {
    await session.close();
  }
}

async function getById(id) {
  const session = driver.session();
  try {
    const result = await session.run(getSkillById, { id });
    if (result.records.length === 0) return null;
    return mapSkill(result.records[0]);
  } finally {
    await session.close();
  }
}

async function getRelated(id, limit = 20) {
  const session = driver.session();
  try {
    const result = await session.run(getRelatedSkills, { id, limit: limit });
    return result.records.map((rec) => ({
      id: rec.get('id'),
      name: rec.get('name'),
      category: rec.get('category'),
      strength: Number(rec.get('strength')),
    }));
  } finally {
    await session.close();
  }
}

module.exports = { getAll, getById, getRelated };
