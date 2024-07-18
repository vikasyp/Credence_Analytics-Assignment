const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Optionally compress rotated files
      maxSize: '20m', // Maximum size of a single file
      maxFiles: '14d' // Max duration before rotation
    })
  ]
});

logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

module.exports = logger;
