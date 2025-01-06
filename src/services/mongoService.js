// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de mieux organiser le code, de le rendre plus modulaire et réutilisable. Cela facilite également la maintenance et le débogage du code.

const { ObjectId } = require('mongodb').BSON;
const  { getDb } = require('../config/db');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  if (!collection) {
    throw new Error('Collection parameter is required');
  }

  if (!id) {
    throw new Error('ID parameter is required');
  }

  try {
    const db = getDb();
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
  const db = getDb();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(data);
  return result;
  } catch (error) {
    console.error('Erreur lors de la création du document:', error);
    throw error;
  }

}

async function findOne(collectionName, query) {
  const db = getDb();
  const collection = db.collection(collectionName);
  const result = await collection.findOne(query);
  return result;
}

async function updateOne(collectionName, query, update) {
  const db = getDb();
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(query, { $set: update });
  return result;
}

async function deleteOne(collectionName, query) {
  const db = getDb();
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne(query);
  return result;
}

async function find(collectionName, query) {
  const db = getDb();
  const collection = db.collection(collectionName);
  return await collection.find(query).toArray();
}

async function aggregate(collectionName, pipeline) {
  const db = getDb();
  const collection = db.collection(collectionName);
  return await collection.aggregate(pipeline).toArray();
}


// Export des services
module.exports = {
  findOneById,
  create,
  findOne,
  updateOne,
  deleteOne,
  find,
  aggregate,
};