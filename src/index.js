const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const authMiddleware = require('./middleware/auth.middleware');
const moderateController = require('./controllers/moderate.controller');
const authController = require('./controllers/auth.controller');

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