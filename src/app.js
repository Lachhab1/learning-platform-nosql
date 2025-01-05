const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();

async function startServer() {
  try {
    await db.connectMongo();
    await db.connectRedis();

    app.use(express.json());
    app.use('/courses', courseRoutes);
    app.use('/users', userRoutes);
    app.use('/enrollments', enrollmentRoutes);

    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', async () => {
  console.log('Shutting down server');
  await db.mongoClient.close();
  await db.redisClient.quit();
  process.exit(0);
});

startServer();