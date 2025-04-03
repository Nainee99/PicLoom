import mongoLogger from './logger.js';

const mongoPlugin = (schema) => {
  // Track operation start time and log duration
  const trackOperation = async (next, operation) => {
    const startTime = Date.now();
    try {
      const result = await next();
      const duration = Date.now() - startTime;
      mongoLogger.logOperation({
        type: operation,
        collection: this.model.modelName,
        query: this.getQuery(),
        duration,
        status: 'success'
      });
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      mongoLogger.logOperation({
        type: operation,
        collection: this.model.modelName,
        query: this.getQuery(),
        duration,
        status: 'error',
        error
      });
      throw error;
    }
  };

  // Monitor all query operations
  ['find', 'findOne', 'findOneAndUpdate', 'findOneAndDelete', 'updateOne', 
   'updateMany', 'deleteOne', 'deleteMany', 'save'].forEach(operation => {
    schema.pre(operation, function() {
      return trackOperation.call(this, this.next.bind(this), operation);
    });
  });

  // Monitor aggregate operations
  schema.pre('aggregate', function() {
    return trackOperation.call(this, this.next.bind(this), 'aggregate');
  });

  // Log any schema-level errors
  schema.post('save', function(error, doc, next) {
    if (error) {
      mongoLogger.logError(error);
    }
    next();
  });
};

export default mongoPlugin;