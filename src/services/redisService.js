// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Définir des TTL appropriés, utiliser des structures de données adaptées, surveiller les performances et la mémoire, et mettre en place des stratégies d'invalidation de cache.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des noms de clés descriptifs et hiérarchiques, éviter les clés trop longues, utiliser des préfixes pour regrouper les clés, et s'assurer que les clés sont uniques.
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.error('Erreur Redis:', err);
});
client.on('connect', () => {
  console.log('Redis connecté');
});


async function cacheData(key, data, ttl) {
  return new Promise((resolve, reject) => {
    client.set(key, JSON.stringify(data), 'EX', ttl, (err, reply) => {
      if (err) {
        return reject(err);
      }
      resolve(reply);
    });
  });
}

module.exports = {
  cacheData,
  getData,
};