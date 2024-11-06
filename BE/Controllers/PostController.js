const Post = require('../Models/Post');

// create a new post
exports.createPost = async (req, res) => {
    const { user_id, category_id, title, content, slug, image_url, status } = req.body;
    try {
        const post = new Post({ user_id, category_id, title, content, slug, image_url, status });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get posts by name
exports.getPostByUserName = async (req, res) => {
    const { name } = req.params;
    try {
        const posts = await Post.find()
            .populate({
                path: 'user_id',
                match: { username: name },
                select: 'username'
            })
            .populate('category_id', 'name');

        const filteredPosts = posts.filter(post => post.user_id);

        if (filteredPosts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user.' });
        }
        res.status(200).json(filteredPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// change a post
exports.updatePost = async (req, res) => {
    const { postId } = req.params; 
    const { title, content, slug, image_url, status } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content, slug, image_url, status },
            { new: true } 
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a post
exports.deletePost = async (req, res) => {
    const { postId } = req.params; // Lấy ID bài viết từ tham số
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(204).send(); // Trả về mã trạng thái 204 No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};