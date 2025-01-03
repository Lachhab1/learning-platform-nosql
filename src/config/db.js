// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Pour organiser le code, faciliter la maintenance et réutiliser les connexions.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Utiliser des méthodes de fermeture dans les gestionnaires d'événements pour libérer les ressources.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongodb.uri);
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({
      url: config.redis.uri
    });

    await redisClient.connect();
    
    redisClient.on('connect', () => {
      console.log('Redis connected');
    });
    
    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    process.exit(1);
  }
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  mongoClient,
  redisClient,
  db,
};