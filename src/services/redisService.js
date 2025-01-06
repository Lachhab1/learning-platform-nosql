// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Définir des TTL appropriés, utiliser des structures de données adaptées, surveiller les performances et la mémoire, et mettre en place des stratégies d'invalidation de cache.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des noms de clés descriptifs et hiérarchiques, éviter les clés trop longues, utiliser des préfixes pour regrouper les clés, et s'assurer que les clés sont uniques.
// redisService.js
const redis = require('redis');

let client = null;

async function initializeClient() {
  if (!client) {
    client = redis.createClient({
      url: process.env.REDIS_URI || 'redis://localhost:6379'
    });

    client.on('error', (err) => console.error('Redis Client Error:', err));
    await client.connect();
  }
  return client;
}

async function cacheData(key, data, ttl) {
  const redisClient = await initializeClient();
  try {
    return await redisClient.set(key, JSON.stringify(data), { EX: ttl });
  } catch (error) {
    console.error('Cache set error:', error);
    throw error;
  }
}

async function getData(key) {
  const redisClient = await initializeClient();
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    throw error;
  }
}

async function closeConnection() {
  if (client) {
    await client.quit();
    client = null;
  }
}

module.exports = {
  cacheData,
  getData,
  closeConnection,
  initializeClient
};