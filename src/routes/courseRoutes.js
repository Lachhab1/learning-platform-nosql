// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour une meilleure organisation et maintenabilité du code.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Grouper les routes par fonctionnalité ou par ressource.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const errorHandler = require('../middleware/errorHandler');
const {courseValidators} = require('../middleware/validators');

// Routes pour les cours
router.post('/', courseValidators.create, courseController.createCourse);
router.put('/:id', courseValidators.update, courseController.updateCourse);
router.get('/:id', courseController.getCourse);
router.get('/', courseController.getAllCourses);
router.delete('/:id', courseController.deleteCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;