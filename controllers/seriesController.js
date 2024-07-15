const series = require('../models/series');
const Series = require('../models/series');

// Create a new series
exports.createSeries = async (req, res) => {
  try {
    const newSeries = new Series(req.body);
    const {name} = newSeries;
    const nameExist = await series.findOne({name})

    if(nameExist){
      return res.status(400).json({message :"Name  already exist."})
    }

    const savedSeries = await newSeries.save();
    res.status(201).json(savedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all series
exports.getAllSeries = async (req, res) => {
  try {
    const series = await Series.find();

    if(series.length === 0 ){
        res.status(404).json({message:"Series not founds"})
      }
    res.status(201).json(series);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a series
exports.updateSeries = async (req, res) => {
  try {
    const id=req.params.id
    const nameExist = await Series.findOne({_id:id})
    if(!nameExist){
       res.status(400).json({message:" Name Of Series is not founds"})
     }
    const updatedSeries = await Series.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(201).json(updatedSeries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a series
exports.deleteSeries = async (req, res) => {
  try {
    const id=req.params.id
    const nameExist = await Series.findOne({_id:id})
    if(!nameExist){
       res.status(404).json({message:"Name Of Series is not founds"})
     }
    await Series.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: 'Series deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
