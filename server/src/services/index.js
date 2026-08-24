const skillService = require('./skillService');
const jobService = require('./jobService');
const recommendationService = require('./recommendationService');
const careerPathService = require('./careerPathService');
const opportunityService = require('./opportunityService');

module.exports = {
  ...skillService,
  ...jobService,
  ...recommendationService,
  ...careerPathService,
  ...opportunityService,
};
