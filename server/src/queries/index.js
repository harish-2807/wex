const skillQueries = require('./skillQueries');
const jobQueries = require('./jobQueries');
const recommendationQueries = require('./recommendationQueries');
const careerPathQueries = require('./careerPathQueries');
const opportunityQueries = require('./opportunityQueries');

module.exports = {
  ...skillQueries,
  ...jobQueries,
  ...recommendationQueries,
  ...careerPathQueries,
  ...opportunityQueries,
};
