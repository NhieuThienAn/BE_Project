const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
// Đăng ký người dùng
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password_hash: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: '2h' });
        res.json({ token });
        console.log(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
    const { id } = req.params; // Lấy ID người dùng từ tham số
    const { username, email, password, bio, avatar_url } = req.body; // Lấy thông tin từ req.body

    try {
        const updatedData = { username, email, bio, avatar_url };

        // Nếu có mật khẩu mới, hash và thêm vào updatedData
        if (password) {
            updatedData.password_hash = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
    const { id } = req.params; // Lấy ID người dùng từ tham số
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(204).send(); // Trả về mã trạng thái 204 No Content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};