const { body, param } = require('express-validator');

const courseValidators = {
  create: [
    body('title').notEmpty().trim().isLength({ min: 3 }),
    body('description').notEmpty().trim(),
    body('duration').optional().isNumeric(),
    body('price').optional().isNumeric(),
  ],
  update: [
    param('id').isMongoId(),
    body('title').optional().trim().isLength({ min: 3 }),
    body('description').optional().trim(),
    body('duration').optional().isNumeric(),
    body('price').optional().isNumeric(),
  ]
};

module.exports = {
  courseValidators
};