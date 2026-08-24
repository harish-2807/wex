const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.listJobs);
router.get('/:id', jobController.getJob);
router.get('/:id/missing-skills', jobController.missingSkills);

module.exports = router;
