const { setupSchema } = require('./setupSchema');
const { seed } = require('./seedDatabase');
const { reset } = require('./resetDatabase');

module.exports = {
  setupSchema,
  seed,
  reset,
};
