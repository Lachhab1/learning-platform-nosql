// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Les routes définissent les points d'entrée de l'application, et les contrôleurs contiennent la logique pour traiter les requêtes et générer des réponses.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour rendre le code plus modulaire et maintenable.

const { ObjectId } = require('mongodb');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    const courseData = req.body;
    const result = await mongoService.create('courses', courseData);
    await redisService.cacheData(`course:${result.insertedId}`, courseData, 3600);
    res.status(201).json({ message: 'Course created successfully', courseId: result.insertedId });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    let course = await redisService.getData(`course:${courseId}`);
    if (!course) {
      course = await mongoService.findOne('courses', { _id: ObjectId(courseId) });
      if (course) {
        await redisService.cacheData(`course:${courseId}`, course, 3600);
      }
    }
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error('Error retrieving course:', error);
    res.status(500).json({ message: 'Error retrieving course', error: error.message });
  }
}

module.exports = {
  createCourse,
  getCourse,
};