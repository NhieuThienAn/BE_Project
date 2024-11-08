import Post from '../Models/Post.js';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';

// Create a new post
export const createPost = async (req, res) => {
    const { user_id, category_id, title, content, slug, image_url, status } = req.body;
    try {
        const post = new Post({ user_id, category_id, title, content, slug, image_url, status });
        await post.save();
        res.status(HttpStatusCode.OK).json(post);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};


// Update a post
export const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content, slug, image_url, status } = req.body;
    if (req.user.role !== 'admin' && user_id !== Post.user_id.toString()) {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content, slug, image_url, status },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    const { postId } = req.params;
    if (req.user.role !== 'admin' && user_id !== Post.user_id.toString()) {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Post not found.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};