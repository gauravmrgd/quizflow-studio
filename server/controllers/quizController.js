const quizService = require('../services/quizService');

/**
 * @desc    Create a new quiz
 * @route   POST /api/quizzes
 * @access  Private/Admin
 */
const createQuiz = async (req, res, next) => {
    try {
        const quiz = await quizService.createQuiz(req.body, req.user._id);
        res.status(201).json({ success: true, data: { quiz } });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a quiz
 * @route   PUT /api/quizzes/:id
 * @access  Private/Admin
 */
const updateQuiz = async (req, res, next) => {
    try {
        const quiz = await quizService.updateQuiz(req.params.id, req.body);
        res.status(200).json({ success: true, data: { quiz } });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a quiz
 * @route   DELETE /api/quizzes/:id
 * @access  Private/Admin
 */
const deleteQuiz = async (req, res, next) => {
    try {
        await quizService.deleteQuiz(req.params.id);
        res.status(200).json({ success: true, data: {}, message: 'Quiz deleted successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all quizzes (admin view)
 * @route   GET /api/quizzes/admin/all
 * @access  Private/Admin
 */
const getAllQuizzesAdmin = async (_req, res, next) => {
    try {
        const quizzes = await quizService.getAllQuizzesAdmin();
        res.status(200).json({ success: true, data: { quizzes } });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get public quizzes (user view, paginated)
 * @route   GET /api/quizzes
 * @access  Private
 */
const getQuizzes = async (req, res, next) => {
    try {
        const { page, limit, category, search } = req.query;
        const result = await quizService.getPublicQuizzes({ page, limit, category, search });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single quiz by ID
 * @route   GET /api/quizzes/:id
 * @access  Private
 */
const getQuiz = async (req, res, next) => {
    try {
        const isAdmin = req.user.role === 'admin';
        const quiz = await quizService.getQuizById(req.params.id, { isAdmin });
        res.status(200).json({ success: true, data: { quiz } });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Submit quiz answers
 * @route   POST /api/quizzes/:id/submit
 * @access  Private
 */
const submitQuiz = async (req, res, next) => {
    try {
        const result = await quizService.submitQuiz(req.params.id, req.user._id, req.body);
        res.status(201).json({ success: true, data: { result } });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get result for a quiz
 * @route   GET /api/quizzes/:id/result
 * @access  Private
 */
const getResult = async (req, res, next) => {
    try {
        const result = await quizService.getResult(req.params.id, req.user._id);
        res.status(200).json({ success: true, data: { result } });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get leaderboard for a quiz
 * @route   GET /api/quizzes/:id/leaderboard
 * @access  Private
 */
const getLeaderboard = async (req, res, next) => {
    try {
        const leaderboard = await quizService.getLeaderboard(req.params.id);
        res.status(200).json({ success: true, data: { leaderboard } });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getAllQuizzesAdmin,
    getQuizzes,
    getQuiz,
    submitQuiz,
    getResult,
    getLeaderboard,
};
