const express = require("express");
const axios = require("axios");
const SearchHistory = require("../models/SearchHistory");

const router = express.Router();

router.get("/weather", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    const apiKey = process.env.OPENWEATHER_API_KEY;

    let url = "";

    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      return res.status(400).json({
        error: "City or coordinates required",
      });
    }

    const response = await axios.get(url);

    const weatherData = response.data;

    await SearchHistory.create({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].main,
    });

    res.json(weatherData);
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch weather",
    });
  }
});

module.exports = router;