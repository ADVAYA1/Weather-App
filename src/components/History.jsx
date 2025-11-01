import React, { useState, useEffect } from 'react';

export default function History({ city, date }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
  const API_URL = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch history');
        return res.json();
      })
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city, date]);

  if (loading) return <div>Loading history...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!history) return null;

  return (
    <div>
      <h3>Historical Weather for {date}</h3>
      <p>Temperature: {history.forecast.forecastday[0].day.avgtemp_c}°C</p>
      <p>Condition: {history.forecast.forecastday[0].day.condition.text}</p>
    </div>
  );
}
