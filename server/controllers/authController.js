const authService = require('../services/authService');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const { user, token } = await authService.registerUser({ name, email, password });

        res.status(201).json({
            success: true,
            data: { user, token },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser({ email, password });

        res.status(200).json({
            success: true,
            data: { user, token },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get current logged-in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
    try {
        const user = await authService.getMe(req.user._id);

        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/update
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
    try {
        const user = await authService.updateUser(req.user._id, req.body);

        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Logout user (client-side token removal; server acknowledges)
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = async (_req, res) => {
    res.status(200).json({
        success: true,
        data: {},
        message: 'Logged out successfully',
    });
};

module.exports = { register, login, getMe, updateProfile, logout };
