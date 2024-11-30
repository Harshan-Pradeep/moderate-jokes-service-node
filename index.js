const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const authMiddleware = require('./src/middleware/auth.middleware');
const moderateController = require('./src/controllers/moderate.controller');
const authController = require('./src/controllers/auth.controller');

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/v1/auth', authController);

// Protected routes
app.use('/api/v1/moderate', authMiddleware, moderateController);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});