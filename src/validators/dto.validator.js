const Joi = require('joi');

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
 *           description: The name of the joke type
 *           example: Knock-Knock
 *     CreateJoke:
 *       type: object
 *       required:
 *         - content
 *         - type
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the joke
 *           example: Why did the chicken cross the road? To get to the other side!
 *         type:
 *           type: string
 *           description: The type of the joke
 *           example: Knock-Knock
 *         author:
 *           type: string
 *           description: The author of the joke
 *           example: John Doe
 *     UpdateJoke:
 *       type: object
 *       required: []
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the joke
 *           example: Updated joke content
 *         type:
 *           type: string
 *           description: The type of the joke
 *           example: Knock-Knock
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: The status of the joke
 *           example: pending
 *         author:
 *           type: string
 *           description: The author of the joke
 *           example: John Doe
 */

const createTypeSchema = Joi.object({
  name: Joi.string().required()
});

const updateJokeSchema = Joi.object({
  content: Joi.string().min(5),
  type: Joi.string(),
  status: Joi.string().valid('pending', 'approved', 'rejected'),
  author: Joi.string()
});

module.exports = {
  createTypeSchema,
  updateJokeSchema
};