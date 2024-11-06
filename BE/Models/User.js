const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    bio: { type: String },
    avatar_url: { type: String },
    role: { type: String, enum: ['admin', 'author', 'user'], default: 'user' },
    created_at: { type: Date, default: Date.now }
});



module.exports = mongoose.model('User', userSchema);