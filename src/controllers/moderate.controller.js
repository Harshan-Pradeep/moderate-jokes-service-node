const express = require('express');
const router = express.Router();
const moderateService = require('../services/moderate.service');
const createValidationMiddleware = require('../middleware/validation.middleware');
const { createTypeSchema, updateJokeSchema } = require('../validators/dto.validator');

router.post('/types', 
  createValidationMiddleware(createTypeSchema),
  async (req, res) => {
    try {
      const result = await moderateService.createJokeType(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.delete('/delete', async (req, res) => {
  try {
    const result = await moderateService.deleteJoke(req.query.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/pending', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await moderateService.getAllJokes(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update',
  createValidationMiddleware(updateJokeSchema),
  async (req, res) => {
    try {
      const result = await moderateService.updateJoke(req.query.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;
