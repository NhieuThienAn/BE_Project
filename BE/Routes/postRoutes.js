const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const auth = require('../middleware/auth'); 

// Tạo bài viết mới
router.post('/posts', auth, postController.createPost);

// Lấy tất cả bài viết
router.get('/posts', postController.getAllPosts);

// Lấy bài viết theo tên người dùng
router.get('/posts/user/:name', auth, postController.getPostByUserName);

module.exports = router;