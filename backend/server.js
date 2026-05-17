const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/weather", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    let url = "";

    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    } else {
      return res.status(400).json({ error: "City or coordinates required" });
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(400).json({ error: data.message });
    }

    res.json(data);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
app.get("/", (req, res) => {
  res.send("🌤️ Weather API is running!");
});