import dotenv from 'dotenv';
dotenv.config(); // Đảm bảo rằng dotenv được nạp ở đầu

import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';
import { jwt as config } from '../config.js'; // Importing the jwt object

const authentication = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'No token provided.' });
        }

        const decoded = jwt.verify(token, config.secretKey); // Sử dụng secretKey từ config
        console.log('Decoded payload:', JSON.stringify(decoded)); // Log payload đã giải mã

        req.user = decoded; // Gán thông tin người dùng vào req.user
        next();

    } catch (error) {
        console.error('Token verification error:', error); // Log lỗi
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Token is not valid.' });
    }
};

export default authentication;