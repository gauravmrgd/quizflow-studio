const morgan = require('morgan');

/**
 * HTTP request logger middleware.
 * Uses 'dev' format in development, 'combined' in production.
 */
const logger = morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev');

module.exports = logger;
