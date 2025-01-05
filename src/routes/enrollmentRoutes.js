const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.post('/', enrollmentController.enrollUser);
router.get('/:id', enrollmentController.getEnrollment);

module.exports = router;