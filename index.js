import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config(); 

import userRoutes from './src/Routes/userRoutes.js';
import postRoutes from './src/Routes/postRoutes.js';
import commentRoutes from './src/Routes/commentRoutes.js';
import categoryRoutes from './src/Routes/categoryRoutes.js';
import path from 'path';

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'View'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/users', (req, res) => res.render('users'));
app.get('/navigation', (req, res) => res.render('navigation'));
app.get('/posts', (req, res) => res.render('posts'));
app.get('/category', (req, res) => res.render('category'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', categoryRoutes);

app.listen(3001, () => console.log('Server listening on port 3001'));