export default function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <div style={{
      maxWidth: 500,
      margin: "0 auto",
      padding: "2rem",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      textAlign: "center"
    }}>
      <h2>{data.name}</h2>

      <h1 style={{ fontSize: "3rem" }}>
        {data.main?.temp?.toFixed(1)}°C
      </h1>

      <p style={{ textTransform: "capitalize" }}>
        {data.weather?.[0]?.description}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <p>🌡️ Feels Like: {data.main?.feels_like}°C</p>
        <p>💧 Humidity: {data.main?.humidity}%</p>
        <p>💨 Wind: {data.wind?.speed} m/s</p>
        <p>🔵 Pressure: {data.main?.pressure} hPa</p>
        <p>
          👁️ Visibility: {(data.visibility / 1000).toFixed(1)} km
        </p>
        <p>
          🌅 Sunrise: {new Date(data.sys?.sunrise * 1000).toLocaleTimeString()}
        </p>
        <p>
          🌇 Sunset: {new Date(data.sys?.sunset * 1000).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}