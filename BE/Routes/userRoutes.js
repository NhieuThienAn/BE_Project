const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

// Đăng ký 
router.post('/register', userController.register);

// Đăng nhập
router.post('/login', userController.login);

// Lấy tất cả người dùng
router.get('/users', userController.getAllUsers); 

// Sửa thông tin người dùng
router.put('/users/:id', userController.updateUser);

// Xóa người dùng
router.delete('/users/:id', userController.deleteUser);
module.exports = router;