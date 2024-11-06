const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/CommentController');

// create a new comment
router.post('/comments', commentController.createComment);

// get all comments
router.get('/comments', commentController.getAllComments);
module.exports = router;