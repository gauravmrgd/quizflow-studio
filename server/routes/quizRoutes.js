const express = require('express');
const router = express.Router();
const {
    createQuiz, updateQuiz, deleteQuiz, getAllQuizzesAdmin,
    getQuizzes, getQuiz, submitQuiz, getResult, getLeaderboard,
} = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/auth');
const { createQuizRules, updateQuizRules, submitQuizRules } = require('../validators/quizValidator');

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz management & attempt endpoints
 */

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all public quizzes (paginated)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title and description
 *     responses:
 *       200:
 *         description: List of quizzes
 */
router.get('/', protect, getQuizzes);

/**
 * @swagger
 * /api/quizzes/admin/all:
 *   get:
 *     summary: Get all quizzes (admin view with full details)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All quizzes with questions
 *       403:
 *         description: Admin only
 */
router.get('/admin/all', protect, authorize('admin'), getAllQuizzesAdmin);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Get a single quiz by ID
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz details (questions randomized, correctAnswer hidden for users)
 */
router.get('/:id', protect, getQuiz);

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Create a new quiz (admin only)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, category, timeLimit, questions]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *               timeLimit:
 *                 type: integer
 *                 minimum: 30
 *               questions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Quiz created
 */
router.post('/', protect, authorize('admin'), createQuizRules, createQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     summary: Update a quiz (admin only)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz updated
 */
router.put('/:id', protect, authorize('admin'), updateQuizRules, updateQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     summary: Delete a quiz (admin only)
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted
 */
router.delete('/:id', protect, authorize('admin'), deleteQuiz);

/**
 * @swagger
 * /api/quizzes/{id}/submit:
 *   post:
 *     summary: Submit quiz answers
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [answers, timeTaken]
 *             properties:
 *               answers:
 *                 type: object
 *                 description: Object mapping questionId to selected answer index
 *               timeTaken:
 *                 type: integer
 *                 description: Time taken in seconds
 *     responses:
 *       201:
 *         description: Quiz submitted, result returned
 *       400:
 *         description: Duplicate submission or validation error
 */
router.post('/:id/submit', protect, submitQuizRules, submitQuiz);

/**
 * @swagger
 * /api/quizzes/{id}/result:
 *   get:
 *     summary: Get user's result for a quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's result
 *       404:
 *         description: No result found
 */
router.get('/:id/result', protect, getResult);

/**
 * @swagger
 * /api/quizzes/{id}/leaderboard:
 *   get:
 *     summary: Get leaderboard for a quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Leaderboard entries sorted by score desc, timeTaken asc
 */
router.get('/:id/leaderboard', protect, getLeaderboard);

module.exports = router;
