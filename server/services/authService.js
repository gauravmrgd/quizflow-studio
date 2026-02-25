const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const generateToken = require('../utils/generateToken');

/**
 * Register a new user.
 */
const registerUser = async ({ name, email, password }) => {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError('A user with this email already exists', 400);
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return { user, token };
};

/**
 * Authenticate user and return token.
 */
const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError('Invalid email or password', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new ApiError('Invalid email or password', 401);
    }

    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    return { user, token };
};

/**
 * Get current user profile.
 */
const getMe = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError('User not found', 404);
    }
    return user;
};

/**
 * Update user profile.
 */
const updateUser = async (userId, updateData) => {
    // If updating password, we need to go through the model save to trigger hashing
    if (updateData.password) {
        const user = await User.findById(userId).select('+password');
        if (!user) throw new ApiError('User not found', 404);

        Object.assign(user, updateData);
        await user.save();
        user.password = undefined;
        return user;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    });

    if (!user) throw new ApiError('User not found', 404);
    return user;
};

module.exports = { registerUser, loginUser, getMe, updateUser };
