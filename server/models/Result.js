const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         quizId:
 *           type: string
 *         score:
 *           type: number
 *         totalQuestions:
 *           type: integer
 *         correct:
 *           type: integer
 *         wrong:
 *           type: integer
 *         timeTaken:
 *           type: number
 *           description: Time taken in seconds
 *         answers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *               selectedAnswer:
 *                 type: integer
 *               isCorrect:
 *                 type: boolean
 *         submittedAt:
 *           type: string
 *           format: date-time
 */

const answerSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        selectedAnswer: {
            type: Number,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            required: true,
        },
    },
    { _id: false }
);

const resultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
            required: true,
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        correct: {
            type: Number,
            required: true,
        },
        wrong: {
            type: Number,
            required: true,
        },
        answers: {
            type: [answerSchema],
            default: [],
        },
        timeTaken: {
            type: Number,
            required: true,
            min: 0,
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

// Prevent duplicate submissions — one result per user per quiz
resultSchema.index({ userId: 1, quizId: 1 }, { unique: true });

// For leaderboard queries
resultSchema.index({ quizId: 1, score: -1, timeTaken: 1 });

module.exports = mongoose.model('Result', resultSchema);
