const express = require('express');
const axios = require('axios');
const { pool } = require('../config/db.mysql');
const SearchLog = require('../models/SearchLog.mongo');
const router = express.Router();

const OWM_KEY = () => process.env.OPENWEATHER_API_KEY;
const OWM_BASE = 'https://api.openweathermap.org/data/2.5/weather';

router.get('/weather', async (req, res) => {
  const { city, lat, lon } = req.query;

  let url = '';
  if (city) {
    url = `${OWM_BASE}?q=${encodeURIComponent(city)}&appid=${OWM_KEY()}&units=metric`;
  } else if (lat && lon) {
    url = `${OWM_BASE}?lat=${lat}&lon=${lon}&appid=${OWM_KEY()}&units=metric`;
  } else {
    return res.status(400).json({ error: 'Provide city or lat/lon' });
  }

  try {
    const { data } = await axios.get(url);
    const result = {
      name: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };

    // Save to MySQL
    try {
      await pool.execute(
        `INSERT INTO search_logs (city, lat, lon, temperature, description) VALUES (?, ?, ?, ?, ?)`,
        [result.name, data.coord.lat, data.coord.lon, result.temp, result.description]
      );
    } catch (e) { console.warn('MySQL log failed:', e.message); }

    // Save to MongoDB
    try {
      await SearchLog.create({
        city: result.name, lat: data.coord.lat, lon: data.coord.lon,
        temperature: result.temp, description: result.description, fullData: data
      });
    } catch (e) { console.warn('MongoDB log failed:', e.message); }

    res.json(result);
  } catch (err) {
    const msg = err.response?.data?.message || 'Weather fetch failed';
    res.status(err.response?.status || 500).json({ error: msg });
  }
});

// Get history from MySQL
router.get('/history', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM search_logs ORDER BY searched_at DESC LIMIT 20');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
console.log("Weather route hit!");