const express = require('express');
const cors = require('cors');
const config = require('./src/config/config');
const authMiddleware = require('./src/middleware/auth.middleware');
const moderateController = require('./src/controllers/moderate.controller');
const authController = require('./src/controllers/auth.controller');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Joke Service API',
      version: '1.0.0',
      description: 'API for jokes management and moderation'
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`,
        description: 'Local server'
      }
    ],
  },
  apis: ['./src/controllers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Public routes
app.use('/api/v1/auth', authController);

// Protected routes
app.use('/api/v1/moderate', authMiddleware, moderateController);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});