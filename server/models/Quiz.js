const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         questionText:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             type: string
 *         correctAnswer:
 *           type: integer
 *           description: Index of the correct option (hidden from user responses)
 *     Quiz:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         difficulty:
 *           type: string
 *           enum: [Easy, Medium, Hard]
 *         timeLimit:
 *           type: integer
 *           description: Time limit in seconds
 *         questionCount:
 *           type: integer
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *         createdBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const questionSchema = new mongoose.Schema(
    {
        questionText: {
            type: String,
            required: [true, 'Question text is required'],
            trim: true,
        },
        options: {
            type: [String],
            required: [true, 'Options are required'],
            validate: {
                validator: (v) => v.length >= 2 && v.length <= 6,
                message: 'A question must have between 2 and 6 options',
            },
        },
        correctAnswer: {
            type: Number,
            required: [true, 'Correct answer index is required'],
            min: 0,
        },
    },
    { _id: true }
);

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Quiz title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters'],
            default: '',
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Medium',
        },
        timeLimit: {
            type: Number,
            required: [true, 'Time limit is required'],
            min: [30, 'Time limit must be at least 30 seconds'],
        },
        questions: {
            type: [questionSchema],
            validate: {
                validator: (v) => v.length >= 1,
                message: 'A quiz must have at least 1 question',
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: false },
        toJSON: {
            virtuals: true,
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
        toObject: { virtuals: true },
    }
);

// Virtual for question count
quizSchema.virtual('questionCount').get(function () {
    return this.questions ? this.questions.length : 0;
});

// Indexes
quizSchema.index({ category: 1 });
quizSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Quiz', quizSchema);
