const { driver } = require('../config/db');
const { recommendJobs, mapRecommendation } = require('../queries/recommendationQueries');

async function recommend(skills, limit = 20) {
  const session = driver.session();
  try {
    const result = await session.run(recommendJobs, { skills, limit });
    return result.records.map(mapRecommendation);
  } finally {
    await session.close();
  }
}

module.exports = { recommend };
