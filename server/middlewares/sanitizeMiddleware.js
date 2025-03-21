import xss from 'xss';
import mongoSanitize from 'express-mongo-sanitize';

// Middleware to sanitize request body, query parameters, and URL parameters
export const sanitizeData = (req, res, next) => {
  try {
    if (req.body) {
      req.body = sanitizeObject(req.body);
    }
    if (req.query) {
      req.query = sanitizeObject(req.query);
    }
    if (req.params) {
      req.params = sanitizeObject(req.params);
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Recursive function to sanitize nested objects and arrays
const sanitizeObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }

  if (obj !== null && typeof obj === 'object') {
    const sanitizedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitizedObj[key] = sanitizeObject(value);
    }
    return sanitizedObj;
  }

  if (typeof obj === 'string') {
    return xss(obj);
  }

  return obj;
};

// Middleware to prevent NoSQL injection
export const preventNoSQLInjection = mongoSanitize();

// Middleware to sanitize file names
export const sanitizeFileName = (req, res, next) => {
  try {
    if (req.file && req.file.originalname) {
      req.file.originalname = req.file.originalname
        .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special characters with underscore
        .replace(/\s+/g, '_'); // Replace spaces with underscore
    }
    if (req.files) {
      req.files = req.files.map(file => {
        file.originalname = file.originalname
          .replace(/[^a-zA-Z0-9.-]/g, '_')
          .replace(/\s+/g, '_');
        return file;
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to sanitize HTML content
export const sanitizeHTML = (req, res, next) => {
  try {
    const htmlFields = ['description', 'content', 'bio']; // Add fields that may contain HTML

    if (req.body) {
      htmlFields.forEach(field => {
        if (req.body[field]) {
          req.body[field] = xss(req.body[field], {
            whiteList: {}, // No tags allowed
            stripIgnoreTag: true, // Strip tags not in whitelist
            stripIgnoreTagBody: ['script', 'style'] // Strip these tags and their contents
          });
        }
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
