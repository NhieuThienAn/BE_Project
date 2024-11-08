import express from 'express';
import * as commentController from '../Controllers/CommentController.js';
import authentication from '../Middleware/auth.js';

const router = express.Router();

// Create a new comment
router.post('/comments', authentication, commentController.createComment); // OK

// Get all comments
router.get('/comments', commentController.getAllComments); // OK

// Delete a comment
router.delete('/comments/:id', authentication, commentController.deleteCommentById); // OK

// Update a comment
router.put('/comments/:id', authentication, commentController.updateCommentById); // OK

export default router;