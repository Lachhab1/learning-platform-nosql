// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de mieux organiser le code, de le rendre plus modulaire et réutilisable. Cela facilite également la maintenance et le débogage du code.

const { ObjectId } = require('mongodb').BSON;

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  if (!collection) {
    throw new Error('Collection parameter is required');
  }

  if (!id) {
    throw new Error('ID parameter is required');
  }

  try {
    const objectId = new ObjectId(id);
    const result = await collection.findOne({ _id: objectId });
    return result;
  } catch (error) {
    console.error('Erreur lors de la recherche par ID:', error);
    throw error;
  }
}

// Export des services
module.exports = {
  findOneById,
};