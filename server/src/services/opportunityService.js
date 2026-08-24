const { driver } = require('../config/db');
const { opportunities, aggregateOpportunities } = require('../queries/opportunityQueries');

async function findOpportunities(skills) {
  const session = driver.session();
  try {
    const result = await session.run(opportunities, { skills });
    return aggregateOpportunities(result.records);
  } finally {
    await session.close();
  }
}

module.exports = { findOpportunities };
