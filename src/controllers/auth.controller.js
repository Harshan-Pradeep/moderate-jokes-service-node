const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === config.auth.email && password === config.auth.password) {
        const token = jwt.sign(
            { email: config.auth.email },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Authentication successful',
            token,
            expiresIn: 86400 // 24 hours in seconds
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.post('/verify', (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        res.json({ valid: true, user: decoded });
    } catch (error) {
        res.json({ valid: false, message: 'Invalid token' });
    }
});

module.exports = router;