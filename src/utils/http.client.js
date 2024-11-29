const axios = require('axios');
const config = require('../config/config');

class HttpClient {
  constructor() {
    this.deliveryServiceUrl = config.deliveryServiceUrl;
    this.submitServiceUrl = config.submitServiceUrl;
  }

  async get(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`HTTP GET Error: ${error.message}`);
    }
  }

  async post(url, data) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`HTTP POST Error: ${error.message}`);
    }
  }

  async put(url, data) {
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`HTTP PUT Error: ${error.message}`);
    }
  }

  async delete(url) {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw new Error(`HTTP DELETE Error: ${error.message}`);
    }
  }
}

module.exports = new HttpClient();