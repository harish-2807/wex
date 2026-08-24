const { driver } = require('../config/db');
const { constraints, indexes } = require('../queries/schemaQueries');

async function setupSchema() {
  const session = driver.session();
  try {
    console.log('Setting up CognoDB schema...');

    for (const query of constraints) {
      try {
        await session.run(query);
        console.log(`Constraint created: ${query.split('CONSTRAINT ')[1].split(' ')[0]}`);
      } catch (error) {
        console.warn(`Constraint warning (may already exist): ${error.message}`);
      }
    }

    for (const query of indexes) {
      try {
        await session.run(query);
        console.log(`Index created: ${query.split('INDEX ')[1].split(' ')[0]}`);
      } catch (error) {
        console.warn(`Index warning (may already exist): ${error.message}`);
      }
    }

    console.log('Schema setup completed');
    return { success: true, message: 'Schema setup completed' };
  } finally {
    await session.close();
  }
}

module.exports = { setupSchema };
