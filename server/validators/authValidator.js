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

const registerRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate,
];

const loginRules = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),
    body('password')
        .notEmpty().withMessage('Password is required'),
    validate,
];

const updateRules = [
    body('name')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Please provide a valid email'),
    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate,
];

module.exports = { registerRules, loginRules, updateRules };
