const { body, validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Middleware to check validation result and return errors.
 */
const validate = (req, _res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => e.msg);
        return next(new ApiError(messages.join('. '), 400));
    }
    next();
};

const createQuizRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Quiz title is required')
        .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
    body('category')
        .trim()
        .notEmpty().withMessage('Category is required'),
    body('timeLimit')
        .isInt({ min: 30 }).withMessage('Time limit must be at least 30 seconds'),
    body('questions')
        .isArray({ min: 1 }).withMessage('At least one question is required'),
    body('questions.*.questionText')
        .trim()
        .notEmpty().withMessage('Question text is required'),
    body('questions.*.options')
        .isArray({ min: 2, max: 6 }).withMessage('Each question must have 2–6 options'),
    body('questions.*.correctAnswer')
        .isInt({ min: 0 }).withMessage('Correct answer index is required and must be >= 0'),
    validate,
];

const updateQuizRules = [
    body('title')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
    body('timeLimit')
        .optional()
        .isInt({ min: 30 }).withMessage('Time limit must be at least 30 seconds'),
    body('questions')
        .optional()
        .isArray({ min: 1 }).withMessage('At least one question is required'),
    body('questions.*.questionText')
        .optional()
        .trim()
        .notEmpty().withMessage('Question text is required'),
    body('questions.*.options')
        .optional()
        .isArray({ min: 2, max: 6 }).withMessage('Each question must have 2–6 options'),
    body('questions.*.correctAnswer')
        .optional()
        .isInt({ min: 0 }).withMessage('Correct answer index must be >= 0'),
    validate,
];

const submitQuizRules = [
    body('answers')
        .isObject().withMessage('Answers must be an object mapping questionId to selected answer index'),
    body('timeTaken')
        .isInt({ min: 0 }).withMessage('timeTaken must be a non-negative integer (seconds)'),
    validate,
];

module.exports = { createQuizRules, updateQuizRules, submitQuizRules };
