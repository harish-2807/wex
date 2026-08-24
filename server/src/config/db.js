const neo4j = require('neo4j-driver');

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

if (!uri || !username || !password) {
  throw new Error('Missing CognoDB environment variables: COGNODB_URI, COGNODB_USERNAME, COGNODB_PASSWORD are required');
}

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

async function verifyConnection() {
  const session = driver.session();
  try {
    await session.run('RETURN 1 AS ok');
    console.log('CognoDB connected successfully');
    return true;
  } catch (error) {
    console.error('CognoDB connection failed:', error.message);
    return false;
  } finally {
    await session.close();
  }
}

async function closeDriver() {
  await driver.close();
}

module.exports = { driver, verifyConnection, closeDriver };
