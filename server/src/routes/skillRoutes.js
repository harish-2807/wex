const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get('/', skillController.listSkills);
router.get('/:id', skillController.getSkill);
router.get('/:id/related', skillController.listRelatedSkills);

module.exports = router;
