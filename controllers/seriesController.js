const Series = require('../models/series');
const logger = require('../logger');

// Create a new series
exports.createSeries = async (req, res) => {
  try {
    const newSeries = new Series(req.body);
    const { name } = newSeries;
    const nameExist = await Series.findOne({ name });

    if (nameExist) {
      logger.warn('Name already exists', { name });
      return res.status(400).json({ message: "Name already exists." });
    }

    const savedSeries = await newSeries.save();
    logger.info('Series created successfully', { series: savedSeries });
    res.status(201).json(savedSeries);
  } catch (err) {
    logger.error('Error creating series', { error: err.message });
    res.status(500).json({ message: err.message });
  }
};

// Get all series
exports.getAllSeries = async (req, res) => {
  try {
    const series = await Series.find();

    if (series.length === 0) {
      logger.info('No series found');
      return res.status(404).json({ message: "Series not found" });
    }

    logger.info('Series retrieved successfully');
    res.status(200).json(series);
  } catch (err) {
    logger.error('Error retrieving series', { error: err.message });
    res.status(500).json({ message: err.message });
  }
};

// get a series by ID
exports.getSeriesById=async (req,res) => {
  try {
    const seriesbyID = await Series.findById(req.params.id);
    if (!seriesbyID) {
      logger.info(`No series found by ID :${seriesbyID}`);
      return res.status(404).json({ message: "No Series found by ID" });
    }
    logger.info('Series retrieved successfully by ID');
    res.status(200).send(seriesbyID);
  } catch (error) {
    logger.error('Error retrieving series by ID', { error: err.message });
    res.status(500).json({ message: err.message });
  }
}
// Update a series
exports.updateSeries = async (req, res) => {
  try {
    const id = req.params.id;
    const nameExist = await Series.findById(id);

    if (!nameExist) {
      logger.warn('Series not found', { id });
      return res.status(400).json({ message: "Series not found" });
    }

    const updatedSeries = await Series.findByIdAndUpdate(id, req.body, { new: true });
    logger.info('Series updated successfully', { series: updatedSeries });
    res.status(200).json(updatedSeries);
  } catch (err) {
    logger.error('Error updating series', { error: err.message });
    res.status(500).json({ message: err.message });
  }
};

// Partial update the series
exports.patchSeries = async (req, res) => {
  try {
    const patchedSeries = await Series.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    if (!patchedSeries) {
      logger.warn('Series not found', { id: req.params.id });
      return res.status(404).json({ message: 'Series not found' });
    }

    logger.info('Series patched successfully', { series: patchedSeries });
    res.status(200).json(patchedSeries);
  } catch (error) {
    logger.error('Error patching series', { error: error.message });
    res.status(400).json({ message: error.message });
  }
};

// Delete a series by ID
exports.deleteSeries = async (req, res) => {
  try {
    const id = req.params.id;
    const seriesExist = await Series.findById(id);

    if (!seriesExist) {
      logger.warn('Series not found', { id });
      return res.status(404).json({ message: "Series not found" });
    }

    await Series.findByIdAndDelete(id);
    logger.info('Series deleted successfully', { id });
    res.status(200).json({ message: 'Series deleted successfully' });
  } catch (err) {
    logger.error('Error deleting series', { error: err.message });
    res.status(500).json({ message: err.message });
  }
};

// all series Delete
exports.deleteAllSeries = async (req, res) => {
  try {
    const series = await Series.find();
    if (series.length === 0) {
      logger.info('No series found');
      return res.status(404).json({ message: "No series found" });
    }

    await Series.deleteMany();
    logger.info('All series deleted successfully');
    res.status(200).json({ message: 'All series deleted successfully' });
  } catch (err) {
    logger.error('Error deleting series', { error: err.message });
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
