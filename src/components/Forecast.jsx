import React, { useState, useEffect } from 'react';

export default function Forecast({ city, unit }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
  const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=no`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch forecast');
        return res.json();
      })
      .then((data) => {
        setForecast(data.forecast);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city]);

  if (loading) return <div>Loading forecast...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!forecast) return null;

  return (
    <div>
      <h3>7-Day Forecast</h3>
      <ul>
        {forecast.forecastday.map(day => (
          <li key={day.date}>
            <strong>{day.date}</strong>: {day.day.condition.text}, {unit === 'celsius' ? `${day.day.avgtemp_c}°C` : `${day.day.avgtemp_f}°F`}
          </li>
        ))}
      </ul>
    </div>
  );
}
