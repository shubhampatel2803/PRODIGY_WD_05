import { useState } from 'react';

export default function SearchBar({ onSearch, onLocate, loading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={e => setCity(e.target.value)}
            style={{
              width: '100%',
              padding: '0.9rem 1.2rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--text)',
              fontSize: '1rem',
              fontFamily: 'DM Sans',
              outline: 'none',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
        <button type="submit" disabled={loading} style={{
          padding: '0.9rem 1.8rem',
          background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
          border: 'none', borderRadius: '12px',
          color: '#fff', fontFamily: 'Syne', fontWeight: 700,
          fontSize: '0.95rem', cursor: 'pointer',
          letterSpacing: '0.03em', transition: 'opacity 0.2s',
          opacity: loading ? 0.7 : 1
        }}>
          SEARCH
        </button>
        <button type="button" onClick={onLocate} disabled={loading} title="Use my location" style={{
          padding: '0.9rem 1rem',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border)',
          borderRadius: '12px', cursor: 'pointer',
          fontSize: '1.3rem', transition: 'background 0.2s',
          color: 'var(--accent)'
        }}
          onMouseEnter={e => e.target.style.background = 'rgba(56,189,248,0.1)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
        >
          📍
        </button>
      </form>
    </div>
  );
}