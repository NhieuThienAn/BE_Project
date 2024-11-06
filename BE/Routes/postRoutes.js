const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const auth = require('../middleware/auth'); 

// create a new post 
router.post('/posts', postController.createPost); //ok

// get all posts
router.get('/posts', postController.getAllPosts); //ok

// get all posts by username
router.get('/posts/user/:name'  , postController.getPostByUserName); //ok

// change post
router.put('/posts/:postId', postController.updatePost);//ok

// delete post
router.delete('/posts/:postId', postController.deletePost);//ok

module.exports = router;