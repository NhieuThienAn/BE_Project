import dotenv from 'dotenv';
dotenv.config(); 

import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';

const SECRET_KEY = process.env.SECRET_KEY;

// Register
export const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password_hash: hashedPassword, role });
        await user.save();
        res.status(HttpStatusCode.OK).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Get user by id
export const getUsersById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};

// Update user information
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, bio, avatar_url } = req.body;

    if (req.user.role !== 'admin' && req.user.id !== id) {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        const updatedData = { username, email, bio, avatar_url };

        if (password) {
            updatedData.password_hash = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.role !== 'admin' && user_id !== User.user_id.toString()) {
        return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Access denied.' });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'User not found.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(HttpStatusCode.SERVER_ERROR).json({ error: error.message });
    }
};