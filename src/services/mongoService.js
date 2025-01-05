// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de mieux organiser le code, de le rendre plus modulaire et réutilisable. Cela facilite également la maintenance et le débogage du code.

const { db } = require('../config/db');

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
// fonction pour créer un document dans une collection
async function create(collectionName, data) {
  try {
  const collection = db.db.collection(collectionName);
  const result = await collection.insertOne(data);
  return result;
  } catch (error) {
    console.error('Erreur lors de la création du document:', error);
    throw error;
  }

}

async function findOne(collectionName, query) {
  const collection = db.db.collection(collectionName);
  const result = await collection.findOne(query);
  return result;
}

async function updateOne(collectionName, query, update) {
  const collection = db.db.collection(collectionName);
  const result = await collection.updateOne(query, { $set: update });
  return result;
}

async function deleteOne(collectionName, query) {
  const collection = db.db.collection(collectionName);
  const result = await collection.deleteOne(query);
  return result;
}


// Export des services
module.exports = {
  findOneById,
  create,
  findOne,
  updateOne,
  deleteOne,
};