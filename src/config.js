import dotenv from 'dotenv';
dotenv.config(); 

export const jwt = {
    secretKey: process.env.SECRET_KEY 
};