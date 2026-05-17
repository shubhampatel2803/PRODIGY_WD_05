const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema({
  city: String,
  lat: Number,
  lon: Number,
  temperature: Number,
  description: String,
  fullData: Object,
  searchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SearchLog', searchLogSchema);
