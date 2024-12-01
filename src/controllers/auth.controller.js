const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 expiresIn:
 *                   type: integer
 *       401:
 *         description: Invalid credentials
 */
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
            expiresIn: 86400
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Verifies a given JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                 message:
 *                   type: string
 */

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