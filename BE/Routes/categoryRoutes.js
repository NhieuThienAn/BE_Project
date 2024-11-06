const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/CategoryController');

// create new category
router.post('/categories', categoryController.createCategory);

// get all categories
router.get('/categories', categoryController.getAllCategories);

module.exports = router;