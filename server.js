const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const seriesRoutes = require('./routes/seriesRoutes');
const logger = require('./logger'); // Assuming you have a logger


dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));

const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL) //{ useNewUrlParser: true, useUnifiedTopology: true }
  .then(() => {
    logger.info('Database connected successfully');
    if (require.main === module) {
      app.listen(PORT, () => {
        logger.info(`Server is running on port: ${PORT}`);
      });
    }
  })
  .catch(error => {
    logger.error('Database connection error:', error);
  });

app.use('/api', seriesRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
