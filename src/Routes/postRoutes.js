import express from 'express';
import { createPost, getAllPosts, updatePost, deletePost } from '../Controllers/PostController.js'; 
import authentication from '../Middleware/auth.js'; 

const router = express.Router();

// Create a new post
router.post('/posts', authentication, createPost);

// Get all posts
router.get('/posts', getAllPosts); 

// Update post by ID
router.put('/posts/:id', authentication, updatePost);

// Delete post by ID
router.delete('/posts/:id', authentication, deletePost);

export default router;