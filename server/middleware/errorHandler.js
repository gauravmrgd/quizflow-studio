const ApiError = require('../utils/ApiError');

/**
 * Global error handler middleware.
 * Converts known error types into clean JSON responses.
 */
const errorHandler = (err, _req, res, _next) => {
    let error = { ...err, message: err.message };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error:', err);
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        error = new ApiError(`Resource not found with id: ${err.value}`, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(', ');
        error = new ApiError(`Duplicate value for field: ${field}`, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => val.message);
        error = new ApiError(messages.join('. '), 400);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = new ApiError('Invalid token', 401);
    }
    if (err.name === 'TokenExpiredError') {
        error = new ApiError('Token expired', 401);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;
