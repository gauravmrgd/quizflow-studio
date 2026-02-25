require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
const logger = require('./middleware/logger');
const { rateLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// --------------- Security & Parsing Middleware ---------------
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// --------------- Rate Limiting ---------------
app.use(rateLimiter);

// --------------- Logging ---------------
app.use(logger);

// --------------- API Routes ---------------
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// --------------- Swagger API Docs ---------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'QuizFlow Studio API Docs',
}));

// --------------- Health Check ---------------
app.get('/api/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'QuizFlow Studio API is running',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});

// --------------- 404 Handler ---------------
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// --------------- Global Error Handler ---------------
app.use(errorHandler);

// --------------- Start Server ---------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
        console.log(`❤️  Health:   http://localhost:${PORT}/api/health\n`);
    });
};

startServer();

module.exports = app;
