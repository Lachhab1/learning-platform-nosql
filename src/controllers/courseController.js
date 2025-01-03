// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Les routes définissent les points d'entrée de l'application, et les contrôleurs contiennent la logique pour traiter les requêtes et générer des réponses.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour rendre le code plus modulaire et maintenable.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    const courseData = req.body;
    const result = await mongoService.create('courses', courseData);
    await redisService.set(`course:${result.insertedId}`, courseData);
    res.status(201).json({ message: 'Course created successfully', courseId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
}
async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    let course = await redisService.get(`course:${courseId}`);
    if (!course) {
      course = await mongoService.findOne('courses', { _id: ObjectId(courseId) });
      if (course) {
        await redisService.set(`course:${courseId}`, course);
      }
    }
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course', error });
  }
}
// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
};