require('dotenv').config();

const requiredEnvVars = ['COGNODB_URI', 'COGNODB_USERNAME', 'COGNODB_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(key => !process.env[key] || process.env[key].trim() === '');

if (missingEnvVars.length > 0) {
  console.error(`Fatal: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const { verifyConnection, closeDriver } = require('./src/config/db');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  const dbConnected = await verifyConnection();
  if (!dbConnected) {
    console.error('Warning: Failed to connect to CognoDB on startup. Health endpoint will report database as disconnected.');
  }

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const gracefulShutdown = async () => {
    console.log('Received shutdown signal, closing connections...');
    server.close(async () => {
      await closeDriver();
      console.log('CognoDB driver closed');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}

startServer();
