const rateLimit = require('express-rate-limit');

/**
 * General rate limiter — 100 requests per 15 minutes per IP.
 */
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests, please try again after 15 minutes',
    },
});

/**
 * Stricter rate limiter for auth routes — 20 requests per 15 minutes.
 */
const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later',
    },
});

module.exports = { rateLimiter, authRateLimiter };
