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
    res.status(201).json({ message: 'Course created', courseId: result.insertedId });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    let course = await redisService.getData(`course:${courseId}`);
    if (!course) {
      course = await mongoService.findOne('courses', { _id: new ObjectId(courseId) });
      if (course) {
        await redisService.cacheData(`course:${courseId}`, course, 3600);
      }
    }
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.status(200).json(course);
  } catch (error) {
    console.error('Error retrieving course:', error);
    res.status(500).json({ message: 'Error retrieving course', error: error.message });
  }
}

async function getAllCourses(req, res) {
  try {
    const courses = await mongoService.find('courses', {});
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error retrieving courses:', error);
    res.status(500).json({ message: 'Error retrieving courses', error: error.message });
  }
}

async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const updateData = req.body;
    const result = await mongoService.updateOne(
      'courses', 
      { _id: new ObjectId(courseId) }, 
      updateData
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await redisService.deleteData(`course:${courseId}`);
    res.status(200).json({ message: 'Course updated', result });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
}

async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const result = await mongoService.deleteOne(
      'courses', 
      { _id: new ObjectId(courseId) }
    );

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await redisService.deleteData(`course:${courseId}`);
    res.status(200).json({ message: 'Course deleted', result });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
}

async function getCourseStats(req, res) {
  try {
    const stats = await mongoService.aggregate('courses', [
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 },
          averageEnrollments: { $avg: '$enrollmentCount' }
        }
      }
    ]);
    res.status(200).json(stats[0] || { totalCourses: 0, averageEnrollments: 0 });
  } catch (error) {
    console.error('Error getting course stats:', error);
    res.status(500).json({ message: 'Error getting course stats', error: error.message });
  }
}

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  getCourseStats
};