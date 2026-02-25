/**
 * Database Seed Script
 * Populates MongoDB with sample data matching the frontend mock data.
 *
 * Usage: cd server && npm run seed
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Quiz = require('./models/Quiz');
const Result = require('./models/Result');

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Quiz.deleteMany({});
        await Result.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create admin user
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@quizflow.com',
            password: 'admin123',
            role: 'admin',
        });
        console.log('👑 Admin user created: admin@quizflow.com / admin123');

        // Create sample users
        const users = await User.insertMany([
            { name: 'Alex Chen', email: 'alex@test.com', password: await bcrypt.hash('password123', 12), role: 'user' },
            { name: 'Sarah Kim', email: 'sarah@test.com', password: await bcrypt.hash('password123', 12), role: 'user' },
            { name: 'Jordan Lee', email: 'jordan@test.com', password: await bcrypt.hash('password123', 12), role: 'user' },
            { name: 'Taylor Swift', email: 'taylor@test.com', password: await bcrypt.hash('password123', 12), role: 'user' },
            { name: 'Morgan Davis', email: 'morgan@test.com', password: await bcrypt.hash('password123', 12), role: 'user' },
            { name: 'Casey Brown', email: 'casey@test.com', password: await bcrypt.hash('password123', 12), role: 'user' },
            { name: 'Riley White', email: 'riley@test.com', password: await bcrypt.hash('password123', 12), role: 'user' },
            { name: 'Jamie Green', email: 'jamie@test.com', password: await bcrypt.hash('password123', 12), role: 'user' },
        ]);
        console.log(`👥 ${users.length} sample users created`);

        // Create quizzes matching frontend mock data
        const quizzes = await Quiz.insertMany([
            {
                title: 'JavaScript Fundamentals',
                description: 'Test your knowledge of core JavaScript concepts including closures, hoisting, and prototypes.',
                category: 'Programming',
                difficulty: 'Medium',
                timeLimit: 300,
                createdBy: admin._id,
                questions: [
                    { questionText: 'What is the output of typeof null in JavaScript?', options: ['null', 'undefined', 'object', 'string'], correctAnswer: 2 },
                    { questionText: 'Which method is used to convert JSON to a JavaScript object?', options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.toObject()'], correctAnswer: 1 },
                    { questionText: "What does the '===' operator check?", options: ['Value only', 'Type only', 'Value and type', 'Reference'], correctAnswer: 2 },
                    { questionText: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'both var and let', 'function'], correctAnswer: 1 },
                    { questionText: 'What is a closure in JavaScript?', options: ['A function inside a loop', 'A function with access to its outer scope', 'A function that closes the browser', 'A self-invoking function'], correctAnswer: 1 },
                ],
            },
            {
                title: 'World Geography',
                description: "How well do you know the world's capitals, landmarks, and geographical features?",
                category: 'Geography',
                difficulty: 'Easy',
                timeLimit: 240,
                createdBy: admin._id,
                questions: [
                    { questionText: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 2 },
                    { questionText: 'Which is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correctAnswer: 1 },
                    { questionText: 'Which country has the most time zones?', options: ['Russia', 'USA', 'France', 'China'], correctAnswer: 2 },
                    { questionText: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correctAnswer: 1 },
                    { questionText: 'On which continent is the Sahara Desert?', options: ['Asia', 'Africa', 'South America', 'Australia'], correctAnswer: 1 },
                ],
            },
            {
                title: 'Space & Astronomy',
                description: 'Explore the cosmos with questions about planets, stars, and space exploration.',
                category: 'Science',
                difficulty: 'Hard',
                timeLimit: 300,
                createdBy: admin._id,
                questions: [
                    { questionText: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1 },
                    { questionText: 'How many planets are in our solar system?', options: ['7', '8', '9', '10'], correctAnswer: 1 },
                    { questionText: 'What is the closest star to Earth?', options: ['Alpha Centauri', 'Betelgeuse', 'The Sun', 'Sirius'], correctAnswer: 2 },
                    { questionText: 'Which planet has the most moons?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], correctAnswer: 1 },
                    { questionText: 'What year did humans first land on the Moon?', options: ['1965', '1967', '1969', '1971'], correctAnswer: 2 },
                ],
            },
            {
                title: 'Modern History',
                description: 'Test your knowledge of key events that shaped the 20th and 21st centuries.',
                category: 'History',
                difficulty: 'Medium',
                timeLimit: 360,
                createdBy: admin._id,
                questions: [
                    { questionText: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correctAnswer: 2 },
                    { questionText: 'Who was the first person to walk on the Moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'], correctAnswer: 1 },
                    { questionText: 'When did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2 },
                    { questionText: 'Which country hosted the first modern Olympics?', options: ['France', 'Greece', 'USA', 'UK'], correctAnswer: 1 },
                    { questionText: 'What event started World War I?', options: ['Invasion of Poland', 'Assassination of Archduke Franz Ferdinand', 'Bombing of Pearl Harbor', 'Treaty of Versailles'], correctAnswer: 1 },
                ],
            },
        ]);
        console.log(`📝 ${quizzes.length} sample quizzes created`);

        // Create sample results for leaderboard
        const resultData = [
            { userId: users[0]._id, quizId: quizzes[0]._id, score: 100, totalQuestions: 5, correct: 5, wrong: 0, timeTaken: 120, answers: [] },
            { userId: users[1]._id, quizId: quizzes[0]._id, score: 95, totalQuestions: 5, correct: 5, wrong: 0, timeTaken: 145, answers: [] },
            { userId: users[2]._id, quizId: quizzes[0]._id, score: 90, totalQuestions: 5, correct: 5, wrong: 0, timeTaken: 130, answers: [] },
            { userId: users[3]._id, quizId: quizzes[0]._id, score: 85, totalQuestions: 5, correct: 4, wrong: 1, timeTaken: 160, answers: [] },
            { userId: users[4]._id, quizId: quizzes[0]._id, score: 80, totalQuestions: 5, correct: 4, wrong: 1, timeTaken: 155, answers: [] },
            { userId: users[5]._id, quizId: quizzes[0]._id, score: 75, totalQuestions: 5, correct: 4, wrong: 1, timeTaken: 170, answers: [] },
            { userId: users[6]._id, quizId: quizzes[0]._id, score: 70, totalQuestions: 5, correct: 4, wrong: 1, timeTaken: 180, answers: [] },
            { userId: users[7]._id, quizId: quizzes[0]._id, score: 65, totalQuestions: 5, correct: 3, wrong: 2, timeTaken: 190, answers: [] },
        ];
        await Result.insertMany(resultData);
        console.log(`🏆 ${resultData.length} sample results created`);

        console.log('\n✅ Database seeded successfully!\n');
        console.log('Login credentials:');
        console.log('  Admin:  admin@quizflow.com / admin123');
        console.log('  User:   alex@test.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
};

seedData();
