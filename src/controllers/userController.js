const mongoService = require('../services/mongoService');

async function createUser(req, res) {
  try {
    const userData = req.body;
    const result = await mongoService.create('users', userData);
    res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await mongoService.findOne('users', { _id: ObjectId(userId) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
}

module.exports = {
  createUser,
  getUser,
};