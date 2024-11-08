import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image_url: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

postSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Post = mongoose.model('Post', postSchema);
export default Post; 