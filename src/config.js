// src/config.js
import dotenv from 'dotenv';
dotenv.config(); // Đảm bảo nạp biến môi trường

export const jwt = {
    secretKey: process.env.SECRET_KEY // Đảm bảo rằng SECRET_KEY đã được nạp từ .env
};