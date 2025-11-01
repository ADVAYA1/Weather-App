import React from 'react';
import WeatherCard from './components/WeatherCard.jsx';

export default function Dashboard({ cities, onSelect, unit }) {
  return (
    <div className="dashboard-bg" style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* Curved SVG background for dashboard */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dashboardGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b3e0ff" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path d="M0,0 L0,700 Q720,900 1440,700 L1440,0 Z" fill="url(#dashboardGradient)" />
        <rect x="0" y="700" width="1440" height="200" fill="#fff" />
      </svg>
      <div className="dashboard-responsive" style={{ position: 'relative', zIndex: 1 }}>
        {cities.map(city => (
          <WeatherCard key={city} city={city} onSelect={onSelect} unit={unit} />
        ))}
      </div>
    </div>
  );
}
