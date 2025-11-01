import React, { useState, useEffect } from 'react';

const CITY = 'London';
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=yes`;

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch weather');
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weatherData) return null;

  return (
    <div>
      <h2>Weather in {weatherData.location.name}</h2>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Condition: {weatherData.current.condition.text}</p>
      <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
      <p>Humidity: {weatherData.current.humidity}%</p>
      <p>Wind: {weatherData.current.wind_kph} kph</p>
      <p>Air Quality (PM2.5): {weatherData.current.air_quality.pm2_5}</p>
    </div>
  );
}
