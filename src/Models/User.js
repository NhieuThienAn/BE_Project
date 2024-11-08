import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    bio: { type: String },
    avatar_url: { type: String },
    role: { type: String, enum: ['admin', 'author', 'user'], default: 'user' },
    created_at: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password_hash')) return next();
    this.updated_at = Date.now();
    next();
});

// Use default export
const User = mongoose.model('User', userSchema);
export default User;