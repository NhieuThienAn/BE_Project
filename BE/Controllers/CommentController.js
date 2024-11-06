const Comment = require('../Models/Comment.JS'); 

// create a new comment
exports.createComment = async (req, res) => {
    const { post_id, user_id, content } = req.body;
    try {
        const comment = new Comment({ post_id, user_id, content });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get all comments
exports.getAllComments = async (req, res) => {
    try{
        const comments = await Comment.find({});
        res.json(comments);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};
