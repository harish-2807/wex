const skillController = require('./skillController');
const jobController = require('./jobController');
const recommendationController = require('./recommendationController');
const careerPathController = require('./careerPathController');

module.exports = {
  ...skillController,
  ...jobController,
  ...recommendationController,
  ...careerPathController,
};
