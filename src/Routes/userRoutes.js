import express from 'express';
import * as userController from '../Controllers/UserController.js'; // Import all named exports
import authentication from '../Middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Get all users
router.get('/users', userController.getAllUsers);

// Get user by ID
router.get('/users/:id', userController.getUsersById);

// Change user
router.put('/users/:id', authentication, userController.updateUser);

// Delete user
router.delete('/users/:id', authentication, userController.deleteUser);

export default router;