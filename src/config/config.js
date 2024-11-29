const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3004,
  deliveryServiceUrl: process.env.DELIVERY_SERVICE_URL,
  submitServiceUrl: process.env.SUBMIT_SERVICE_URL
};