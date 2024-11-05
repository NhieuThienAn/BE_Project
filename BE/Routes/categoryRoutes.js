const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/CategoryController');

// Tạo danh mục
router.post('/categories', categoryController.createCategory);

// Lấy tất cả danh mục
router.get('/categories', categoryController.getAllCategories);

module.exports = router;