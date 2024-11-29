const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3004,
  deliveryServiceUrl: process.env.DELIVERY_SERVICE_URL,
  submitServiceUrl: process.env.SUBMIT_SERVICE_URL,
  jwtSecret: process.env.JWT_SECRET,
  auth: {
    email: 'admin@admin.com',
    password: 'admin123'
  }
};