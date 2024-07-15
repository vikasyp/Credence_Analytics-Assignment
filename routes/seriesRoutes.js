const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');

router.post('/series', seriesController.createSeries);
router.get('/series', seriesController.getAllSeries);
router.put('/series/:id', seriesController.updateSeries);
router.delete('/series/:id', seriesController.deleteSeries);

module.exports = router;
