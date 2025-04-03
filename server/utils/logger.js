import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

import fs from 'fs';
import { dirname } from 'path';

// Configure log directory
const logDir = path.join(process.cwd(), 'logs');

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const maxSize = '20m';
const maxFiles = '14d';

// Create the logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Rotating file transport for MongoDB operations
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, 'mongodb-ops-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize,
      maxFiles,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

// Create a MongoDB operation logger
const mongoLogger = {
  logOperation: (operation) => {
    const { type, collection, query, duration, status, error } = operation;
    logger.info('MongoDB Operation', {
      type,
      collection,
      query: JSON.stringify(query),
      duration,
      status,
      ...(error && { error: error.message }),
    });
  },
  logError: (error) => {
    logger.error('MongoDB Error', {
      message: error.message,
      stack: error.stack,
    });
  },
};

export default mongoLogger;