const express = require('express');
const userHelper = require('../helpers/userHelper/index');
const adminHelper = require('../helpers/adminHelper');
const signupValidator = require('../middlewares/signupValidator');
const { validationResult } = require('express-validator');
const router = express.Router();

//admin root route
router.get('/api/dashboard', (req,res)=>{

});

//get user details
router.post('/api/user',(req,res)=>{

});

//updating the user 
router.post('/api/edit-user',signupValidator,(req,res)=>{

   
});

router.post('/api/delete-user',(req,res)=>{
  
});
//create user post route 
router.post('/api/create-user',signupValidator,(req,res)=>{

});
module.exports =  router;