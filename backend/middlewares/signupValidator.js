const { body,validationResult } = require('express-validator');
const User = require('../MongoDb/models/userModels/User.js');

//validaing form

module.exports = [
    // Validate fullname
  body('fullname')
  .notEmpty()
  .withMessage('Full name is required'),

// Validate username
body('username')
    .notEmpty()
    .withMessage('Username is required')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error('Username already exists');
      }
      return true;
    }),


// Validate password
body('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long'),

// Validate address
body('address')
  .notEmpty()
  .withMessage('Address is required'),

// Validate phone number
body('phone')
  .notEmpty()
  .withMessage('Phone number is required')
  .isMobilePhone()
  .withMessage('Invalid phone number')
  .custom(async (value) => {
    const user = await User.findOne({ phone: value });
    if (user) {
      throw new Error('Phone is already exists');
    }
    return true;
  }),

// Validate email
body('email')
.notEmpty()
.withMessage('Email is required')
.isEmail()
.withMessage('Invalid email address')
.custom(async (value) => {
  const user = await User.findOne({ email: value });
  if (user) {
    throw new Error('Email already exists');
  }
  return true;
})
    
    // .custom((value,{req}) => {
    //     if (value !== req.body.confirmPass) {
    //         // trow error if passwords do not match
    //         throw new Error("Passwords don't match");
    //     }
    //     return true;
    // })
]