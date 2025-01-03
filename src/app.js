// Question: Comment organiser le point d'entrée de l'application ?
// Réponse: Le point d'entrée de l'application doit être organisé de manière à initialiser les connexions aux bases de données, configurer les middlewares Express, monter les routes et démarrer le serveur.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse: La meilleure façon de gérer le démarrage de l'application est de créer une fonction asynchrone qui initialise les connexions aux bases de données, configure les middlewares Express, monte les routes et démarre le serveur. Cette fonction doit gérer les erreurs et les arrêts propres.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');

const app = express();

async function startServer() {
  try {
    // Connexion aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    // Configuration des middlewares
    app.use(express.json());

    // Montage des routes
    app.use('/courses', courseRoutes);

    // Démarrage du serveur
    app.listen(config.port, () => {
      console.log(`Serveur démarré sur le port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('Arrêt du serveur');
  await db.closeMongo();
  await db.closeRedis();
  process.exit(0);
});

startServer();