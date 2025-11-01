import React, { useState, useEffect } from 'react';

export default function WeatherCard({ city, onSelect, unit }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
  const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
  const [startDate, setStartDate] = useState(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    async function fetchCurrent() {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const result = await res.json();
        setData(result);
      } catch (err) {
        setData(null);
      }
      setLoading(false);
    }
    fetchCurrent();
  }, [city, unit]);

  useEffect(() => {
    async function fetchRange() {
      let rangeData = [];
      let current = new Date(startDate);
      const end = new Date(endDate);
      while (current <= end) {
        const dateStr = current.toISOString().slice(0, 10);
        const url = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${dateStr}`;
        // eslint-disable-next-line no-await-in-loop
        const res = await fetch(url);
        // eslint-disable-next-line no-await-in-loop
        const data = await res.json();
        if (
          data.forecast &&
          data.forecast.forecastday &&
          Array.isArray(data.forecast.forecastday) &&
          data.forecast.forecastday[0]
        ) {
          rangeData = rangeData.concat(data.forecast.forecastday[0].hour || []);
        }
        current.setDate(current.getDate() + 1);
      }
      setHistoryData(rangeData);
    }
    fetchRange();
  }, [city, startDate, endDate]);
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
      <div style={{ marginTop: 12 }}>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} max={endDate} />
        </label>
        <label style={{ marginLeft: 8 }}>
          End Date:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} max={new Date().toISOString().slice(0, 10)} min={startDate} />
        </label>
      </div>
      <div style={{ marginTop: 12 }}>
        <h4>Historical Temperature</h4>
        {historyData.length > 0 ? (
          <ul style={{ maxHeight: 120, overflowY: 'auto', padding: 0, margin: 0 }}>
            {historyData.map((hour, idx) => (
              <li key={idx} style={{ listStyle: 'none', fontSize: 13 }}>
                {hour.time}: {unit === 'celsius' ? `${hour.temp_c}°C` : `${hour.temp_f}°F`}
              </li>
            ))}
          </ul>
        ) : (
          <span>No historical data</span>
        )}
      </div>
    </div>
  );
}
