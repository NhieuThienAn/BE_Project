const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try { 
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY); 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid.' });
    }
    console.log('Token:', token); 
};

module.exports = auth;