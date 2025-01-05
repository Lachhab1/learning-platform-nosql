// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Pour s'assurer que toutes les configurations nécessaires sont présentes et éviter les erreurs d'exécution.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : L'application peut échouer au démarrage ou se comporter de manière imprévisible.

const dotenv = require('dotenv');
dotenv.config({ path: '/.env' });
require('dotenv').config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];


// Validation des variables d'environnement
function validateEnv() {
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
}

validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};