import React, { useState, useEffect } from 'react';

export default function WeatherCard({ city, onSelect, unit }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
  const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;

  useEffect(() => {
    const cacheKey = `weather_${city}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data: cachedData, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 60000) {
        setData(cachedData);
        setLoading(false);
        return;
      }
    }
    fetch(API_URL)
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        localStorage.setItem(cacheKey, JSON.stringify({ data: fetchedData, timestamp: Date.now() }));
      })
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <div className="card">Loading...</div>;
  if (!data) return <div className="card">Error loading data</div>;

  return (
  <div className="card-responsive" onClick={() => onSelect(city)}>
      <h3>{data.location.name}</h3>
      <img src={data.current.condition.icon} alt={data.current.condition.text} />
      <p>
        {unit === 'celsius'
          ? `${data.current.temp_c}°C`
          : `${data.current.temp_f}°F`}
      </p>
      <p>{data.current.condition.text}</p>
      <p>Humidity: {data.current.humidity}%</p>
      <p>
        Wind: {unit === 'celsius' ? `${data.current.wind_kph} kph` : `${data.current.wind_mph} mph`}
      </p>
    </div>
  );
}
