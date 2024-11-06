const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoutes = require('./BE/Routes/userRoutes');
const postRoutes = require('./BE/Routes/postRoutes');
const commentRoutes = require('./BE/Routes/commentRoutes');
const categoryRoutes = require('./BE/Routes/categoryRoutes');
const path = require('path'); // Thêm dòng này

dotenv.config();

const app = express();

// Thiết lập EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'View')); // Sử dụng __dirname để chỉ định đường dẫn tuyệt đối
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

// Route hiển thị trang đăng nhập
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});
// Route hiển thị trang người dùng
app.get('/users', (req, res) => {
    res.render('users');
});
// Kết nối với MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Đăng ký các routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', categoryRoutes);

// Khởi động server
app.listen(3001, () => {
    console.log('Server listening on port 3001');
});