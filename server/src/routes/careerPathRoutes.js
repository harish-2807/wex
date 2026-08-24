const express = require('express');
const router = express.Router();
const careerPathController = require('../controllers/careerPathController');

router.get('/career-paths', careerPathController.careerPaths);
router.get('/opportunities', careerPathController.opportunities);

module.exports = router;
