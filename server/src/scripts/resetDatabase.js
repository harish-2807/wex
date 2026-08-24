// DEVELOPMENT ONLY: Clears all CareerGraph application data.
// Use: npm run seed:reset
// This is NOT exposed as an API endpoint and NOT available via the frontend.
// It only removes nodes/relationships, not constraints or indexes.

require('dotenv').config();
const { driver } = require('../config/db');

async function reset() {
  const session = driver.session();
  try {
    await session.run('MATCH (n) DETACH DELETE n');
    console.log('CareerGraph application data cleared (development only).');
  } finally {
    await session.close();
    await driver.close();
  }
}

reset().catch((error) => {
  console.error('Reset failed:', error.message);
  process.exit(1);
});
