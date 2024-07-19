const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');

router.post('/series', seriesController.createSeries);
router.get('/series', seriesController.getAllSeries);
router.get('/series/:id', seriesController.getSeriesById);
router.put('/series/:id', seriesController.updateSeries);
router.patch('/series/:id', seriesController.patchSeries);
router.delete('/series/:id', seriesController.deleteSeries);
router.delete('/series', seriesController.deleteAllSeries);

module.exports = router;
