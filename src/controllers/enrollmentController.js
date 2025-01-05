const mongoService = require('../services/mongoService');

async function enrollUser(req, res) {
  try {
    const enrollmentData = req.body;
    const result = await mongoService.create('enrollments', enrollmentData);
    res.status(201).json({ message: 'User enrolled successfully', enrollmentId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling user', error });
  }
}

async function getEnrollment(req, res) {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await mongoService.findOne('enrollments', { _id: ObjectId(enrollmentId) });
    if (enrollment) {
      res.status(200).json(enrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving enrollment', error });
  }
}

module.exports = {
  enrollUser,
  getEnrollment,
};