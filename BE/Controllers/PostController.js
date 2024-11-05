const Post = require('../Models/Post');

// Tạo bài viết mới
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

// Lấy tất cả bài viết
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
//            .populate('user_id', 'username') 
  //          .populate('category_id', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy bài viết theo tên người dùng
exports.getPostByUserName = async (req, res) => {
    const { name } = req.params; // Lấy tên từ tham số
    try {
        const posts = await Post.find({ 'user.username': name })
            .populate('user_id', 'username')
            .populate('category_id', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};