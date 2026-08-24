const express = require('express');
const router = express.Router();
const { driver } = require('../config/db');
const { setupSchema } = require('../scripts/setupSchema');

const skillRoutes = require('./skillRoutes');
const jobRoutes = require('./jobRoutes');
const recommendationRoutes = require('./recommendationRoutes');
const careerPathRoutes = require('./careerPathRoutes');

router.get('/health', async (req, res) => {
  try {
    const session = driver.session();
    try {
      await session.run('RETURN 1 AS ok');
      res.json({ status: 'ok', database: 'connected' });
    } finally {
      await session.close();
    }
  } catch (error) {
    console.error('Health check database error:', error.message);
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: 'Database connection unavailable'
    });
  }
});

router.post('/schema/setup', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  try {
    const result = await setupSchema();
    res.json(result);
  } catch (error) {
    console.error('Schema setup error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Schema setup failed'
    });
  }
});

router.use('/skills', skillRoutes);
router.use('/jobs', jobRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/', careerPathRoutes);

router.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

module.exports = router;
