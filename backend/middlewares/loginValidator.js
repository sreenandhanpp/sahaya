const { body,validationResult } = require('express-validator');
const User = require('../MongoDb/models/userModels/User.js');

//validaing form

module.exports = [

// Validate password
body('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long'),

// Validate email
body('email')
.notEmpty()
.withMessage('Email is required')
.isEmail()
.withMessage('Invalid email address')

    
]