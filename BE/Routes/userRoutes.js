const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

// register
router.post('/register', userController.register); //ok

// login
router.post('/login', userController.login); //ok

// get all users
router.get('/users', userController.getAllUsers); //ok

// change user 
router.put('/users/:id', userController.updateUser);//ok

// delete user
router.delete('/users/:id', userController.deleteUser); //ok

module.exports = router;