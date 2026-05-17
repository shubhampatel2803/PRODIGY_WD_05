export default function Loader() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '4rem', gap: '1rem'
    }}>
      <div style={{
        width: 48, height: 48,
        border: '3px solid rgba(56,189,248,0.2)',
        borderTop: '3px solid #38bdf8',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: 'var(--muted)', fontFamily: 'DM Sans', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
        FETCHING WEATHER...
      </p>
    </div>
  );
}