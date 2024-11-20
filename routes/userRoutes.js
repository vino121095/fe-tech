const express = require('express');
const router = express.Router();
const { userRegistrationValidationRules, userLoginValidationRules, validateUser, adminRegistrationValidationRules } = require('../valitadors/UserValidator');
const userController = require('../controller/Usercontroller');

// Register route
router.post('/registerUser', userRegistrationValidationRules(), validateUser, userController.registerUser);

// admin register
router.post('/admin', adminRegistrationValidationRules(), validateUser, userController.registerAdmin);

// Login route
router.post('/loginUser', userLoginValidationRules(), validateUser, userController.loginUser);


module.exports = router;
