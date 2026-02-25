const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const ApiError = require('../utils/ApiError');

/**
 * Create a new quiz (admin only).
 */
const createQuiz = async (quizData, adminId) => {
    const quiz = await Quiz.create({ ...quizData, createdBy: adminId });
    return quiz;
};

/**
 * Update an existing quiz (admin only).
 */
const updateQuiz = async (quizId, updateData) => {
    const quiz = await Quiz.findByIdAndUpdate(quizId, updateData, {
        new: true,
        runValidators: true,
    });
    if (!quiz) throw new ApiError('Quiz not found', 404);
    return quiz;
};

/**
 * Delete a quiz (admin only).
 */
const deleteQuiz = async (quizId) => {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) throw new ApiError('Quiz not found', 404);

    // Also remove all results for this quiz
    await Result.deleteMany({ quizId });

    return quiz;
};

/**
 * Get all quizzes for admin (no pagination, include questions).
 */
const getAllQuizzesAdmin = async () => {
    const quizzes = await Quiz.find()
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });
    return quizzes;
};

/**
 * Get public quizzes with pagination, search, and category filter.
 * Questions are returned WITHOUT correctAnswer.
 */
const getPublicQuizzes = async ({ page = 1, limit = 10, category, search }) => {
    const query = {};

    if (category && category !== 'All') {
        query.category = category;
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    const total = await Quiz.countDocuments(query);

    const quizzes = await Quiz.find(query)
        .select('-questions.correctAnswer')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        quizzes,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

/**
 * Get a single quiz by ID.
 * For users: randomize question order and hide correctAnswer.
 * For admin: return full quiz.
 */
const getQuizById = async (quizId, { isAdmin = false } = {}) => {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new ApiError('Quiz not found', 404);

    if (isAdmin) return quiz;

    // Convert to plain object and remove correctAnswer + randomize
    const quizObj = quiz.toJSON();
    quizObj.questions = quizObj.questions
        .map((q) => {
            const { correctAnswer, ...rest } = q;
            return rest;
        })
        .sort(() => Math.random() - 0.5);

    return quizObj;
};

/**
 * Submit a quiz attempt — calculate score, prevent duplicates.
 */
const submitQuiz = async (quizId, userId, { answers, timeTaken }) => {
    // Check for duplicate submission
    const existingResult = await Result.findOne({ userId, quizId });
    if (existingResult) {
        throw new ApiError('You have already submitted this quiz', 400);
    }

    // Get quiz with correct answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new ApiError('Quiz not found', 404);

    // Validate time — allow a small grace period (5 seconds)
    if (timeTaken > quiz.timeLimit + 5) {
        throw new ApiError('Time limit exceeded', 400);
    }

    // Calculate score
    const totalQuestions = quiz.questions.length;
    let correct = 0;
    const processedAnswers = [];

    quiz.questions.forEach((question) => {
        const qId = question._id.toString();
        const selectedAnswer = answers[qId];
        const isCorrect = selectedAnswer !== undefined && selectedAnswer === question.correctAnswer;

        if (isCorrect) correct++;

        processedAnswers.push({
            questionId: question._id,
            selectedAnswer: selectedAnswer !== undefined ? selectedAnswer : -1,
            isCorrect,
        });
    });

    const wrong = totalQuestions - correct;
    const score = Math.round((correct / totalQuestions) * 100);

    const result = await Result.create({
        userId,
        quizId,
        score,
        totalQuestions,
        correct,
        wrong,
        answers: processedAnswers,
        timeTaken,
    });

    return result;
};

/**
 * Get a user's result for a specific quiz.
 */
const getResult = async (quizId, userId) => {
    const result = await Result.findOne({ userId, quizId })
        .populate('quizId', 'title category');

    if (!result) throw new ApiError('No result found for this quiz', 404);
    return result;
};

/**
 * Get leaderboard for a specific quiz.
 * Sorted by score (desc), then timeTaken (asc).
 */
const getLeaderboard = async (quizId) => {
    const results = await Result.find({ quizId })
        .populate('userId', 'name')
        .sort({ score: -1, timeTaken: 1 });

    const leaderboard = results.map((r, index) => ({
        rank: index + 1,
        name: r.userId?.name || 'Unknown',
        score: r.score,
        timeTaken: r.timeTaken,
        userId: r.userId?._id || r.userId,
    }));

    return leaderboard;
};

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getAllQuizzesAdmin,
    getPublicQuizzes,
    getQuizById,
    submitQuiz,
    getResult,
    getLeaderboard,
};
