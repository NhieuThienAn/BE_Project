import express from 'express';
import { createPost, getAllPosts, updatePost, deletePost } from '../Controllers/PostController.js'; // Đảm bảo rằng các hàm này đã được export đúng
import authentication from '../Middleware/auth.js'; // Đảm bảo đường dẫn đúng

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