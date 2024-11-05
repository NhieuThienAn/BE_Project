const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/CommentController');
//Đăng Bình Luận
router.post('/comments', commentController.createComment);

//Lấy Tất Cả Bình Luận
router.get('/comments', commentController.getAllComments);
module.exports = router;