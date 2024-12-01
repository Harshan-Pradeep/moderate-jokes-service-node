const express = require('express');
const router = express.Router();
const moderateService = require('../services/moderate.service');
const createValidationMiddleware = require('../middleware/validation.middleware');
const { createTypeSchema, updateJokeSchema } = require('../validators/dto.validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the joke type
 *           minLength: 3
 *           example: "Knock-Knock"
 *
 *     CreateJoke:
 *       type: object
 *       required:
 *         - content
 *         - type
 *         - author
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the joke
 *           minLength: 3
 *           example: "Why did the chicken cross the road? To get to the other side!"
 *         type:
 *           type: string
 *           description: The category/type of the joke
 *           example: "Knock-Knock"
 *         author:
 *           type: string
 *           description: Name of the joke author
 *           example: "John Doe"
 *
 *     UpdateJoke:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The updated content of the joke
 *           minLength: 3
 *           example: "Why did the chicken cross the road? To get to the other side!"
 *         type:
 *           type: string
 *           description: The category/type of the joke
 *           example: "Knock-Knock"
 *         status:
 *           type: string
 *           description: The moderation status of the joke
 *           enum: [pending, approved, rejected]
 *           example: "approved"
 *         author:
 *           type: string
 *           description: Name of the joke author
 *           example: "John Doe"
 *       required:
 *         - status
 *
 * /moderate/types:
 *   post:
 *     summary: Create a new joke type
 *     tags: [Moderate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateType'
 *     responses:
 *       201:
 *         description: Joke type created successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 201
 *               message: "Joke type created successfully"
 *               data:
 *                 name: "sample type"
 *                 id: 1
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: [
 *                 "Name must be at least 3 characters long",
 *                 "Name cannot be empty",
 *                 "Name must be a string"
 *               ]
 *               errors: "Bad Request"
 *       500:
 *         description: Error creating joke type
 *
 * /moderate/delete:
 *   delete:
 *     summary: Delete a joke by ID
 *     tags: [Moderate]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               message: "Joke deleted successfully"
 *               data:
 *                 success: true
 *       400:
 *         description: Invalid joke ID format
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: "Invalid joke ID format."
 *       404:
 *         description: Joke not found
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "Joke not found"
 *       500:
 *         description: Error deleting joke
 *
 * /moderate/pending:
 *   get:
 *     summary: Get all pending jokes with pagination
 *     tags: [Moderate]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of pending jokes
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               message: "Pending jokes retrieved successfully"
 *               data:
 *                 - content: "Why did the chicken cross the road? To get to the other side!"
 *                   type: "sample type"
 *                   status: "pending"
 *                   author: "John Doe"
 *                   _id: "sample id"
 *                   createdAt: "2024-12-01T12:50:44.322Z"
 *       400:
 *         description: Bad request. Page and limit must be positive numbers.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: "Page and limit must be positive numbers."
 *       500:
 *         description: Error retrieving pending jokes
 *
 * /moderate/update:
 *   put:
 *     summary: Update a joke by ID
 *     tags: [Moderate]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJoke'
 *     responses:
 *       200:
 *         description: Joke updated successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               message: "Joke updated successfully"
 *               data:
 *                 id: "60d21b4667d0d8992e610c85"
 *                 content: "Updated joke content"
 *                 type: "Knock-Knock"
 *                 status: "approved"
 *                 author: "John Doe"
 *       400:
 *         description: Invalid joke ID format
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: "Invalid joke ID format."
 *       404:
 *         description: Joke not found
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: "Joke with ID not found"
 *       500:
 *         description: Error updating joke
 */

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
