const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

/**
 * Protect routes — verify JWT and attach user to request.
 */
const protect = async (req, _res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new ApiError('Not authorized — no token provided', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ApiError('Not authorized — user not found', 401));
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new ApiError('Not authorized — invalid token', 401));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new ApiError('Not authorized — token expired', 401));
        }
        next(error);
    }
};

/**
 * Authorize specific roles.
 * @param  {...string} roles - Allowed roles (e.g., 'admin')
 */
const authorize = (...roles) => {
    return (req, _res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(`Role '${req.user.role}' is not authorized to access this route`, 403));
        }
        next();
    };
};

module.exports = { protect, authorize };
