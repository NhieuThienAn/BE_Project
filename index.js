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

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

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
//user
app.use('/api', userRoutes);
//post
app.use('/api', postRoutes);
//comment
app.use('/api', commentRoutes);
//category
app.use('/api', categoryRoutes);


//xử lý lỗi
// Improved error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
});
// Khởi động server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});