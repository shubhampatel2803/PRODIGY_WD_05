import { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Loader from '../components/Loader';

const API = 'http://localhost:5000/api';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const fetchWeather = async (city) => {
    setLoading(true); setError('');
    try {
      const res = await axios.get(`${API}/weather?city=${city}`);
      setWeather(res.data);
      setHistory(h => [city, ...h.filter(c => c !== city)].slice(0, 5));
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
      setWeather(null);
    } finally { setLoading(false); }
  };

  const fetchByLocation = () => {
    if (!navigator.geolocation) return setError('Geolocation not supported.');
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setLoading(true); setError('');
        try {
          const res = await axios.get(`${API}/weather?lat=${coords.latitude}&lon=${coords.longitude}`);
          setWeather(res.data);
        } catch (err) {
          setError(err.response?.data?.error || 'Could not fetch location weather.');
          setWeather(null);
        } finally { setLoading(false); }
      },
      () => setError('Location access denied.')
    );
  };

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(1.5rem, 5vw, 4rem) clamp(1rem, 5vw, 2rem)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '100px', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontFamily: 'Syne', fontWeight: 600, letterSpacing: '0.1em' }}>LIVE WEATHER DATA</span>
        </div>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.05, background: 'linear-gradient(135deg, #f0f4ff 30%, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Weather<br />Anywhere.
        </h1>
        <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '1rem' }}>
          Search by city or use your current location
        </p>
      </div>

      <SearchBar onSearch={fetchWeather} onLocate={fetchByLocation} loading={loading} />

      {history.length > 0 && (
        <div style={{ maxWidth: 600, margin: '1.5rem auto 0', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem', alignSelf: 'center' }}>Recent:</span>
          {history.map(h => (
            <button key={h} onClick={() => fetchWeather(h)} style={{
              padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.8rem',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              color: 'var(--text)', cursor: 'pointer', fontFamily: 'DM Sans',
              transition: 'background 0.2s'
            }}
              onMouseEnter={e => e.target.style.background = 'rgba(56,189,248,0.1)'}
              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
            >{h}</button>
          ))}
        </div>
      )}

      <div style={{ marginTop: '2.5rem' }}>
        {loading && <Loader />}
        {error && (
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem 1.5rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '12px', color: 'var(--danger)', textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}
        {!loading && weather && <WeatherCard data={weather} />}
      </div>

      <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '4rem', fontSize: '0.8rem' }}>
        Powered by OpenWeatherMap API
      </p>
    </div>
  );
}