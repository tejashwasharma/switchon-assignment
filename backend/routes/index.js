const express = require('express');
const router = express.Router();
const populateDataController = require('../controllers/populateData.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const departmentController = require('../controllers/department.controller');

router.post('/populate-data', populateDataController.populateDummyDataInDB);

router.post('/login', authController.login);

router.get('/departments', departmentController.getallDepartments);

router.get('/users/:department', userController.getUsersByDepartment);

module.exports = router;
