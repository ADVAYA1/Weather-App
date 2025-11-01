import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forecast from './components/Forecast.jsx';
import WeatherChart from './components/WeatherChart.jsx';

export default function DetailedView({ unit }) {
  const { cityName } = useParams();
  const [hourly, setHourly] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [historyData, setHistoryData] = useState([]);
  const [historyStats, setHistoryStats] = useState([]);
  const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
  const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=yes&alerts=no`;

  useEffect(() => {
    fetch(forecastUrl)
      .then(res => res.json())
      .then(data => {
        if (
          data.forecast &&
          data.forecast.forecastday &&
          Array.isArray(data.forecast.forecastday) &&
          data.forecast.forecastday[0]
        ) {
          // Collect all hourly data for all forecast days
          const allHourly = data.forecast.forecastday.flatMap(day => day.hour);
          setHourly(allHourly);
          // Use the first day's stats for details
          setStats(data.forecast.forecastday[0].day || null);
        } else {
          setHourly([]);
          setStats(null);
        }
        setLoading(false);
      });
  }, [cityName]);

  useEffect(() => {
    async function fetchRange() {
      let rangeData = [];
      let rangeStats = [];
      let current = new Date(startDate);
      const end = new Date(endDate);
      while (current <= end) {
        const dateStr = current.toISOString().slice(0, 10);
        const url = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${cityName}&dt=${dateStr}`;
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
          rangeStats.push(data.forecast.forecastday[0].day || null);
        }
        current.setDate(current.getDate() + 1);
      }
      setHistoryData(rangeData);
      setHistoryStats(rangeStats);
    }
    fetchRange();
  }, [cityName, startDate, endDate]);

  if (loading) return <div>Loading details...</div>;
  if (!stats) return <div>No detailed data available for this city/date.</div>;

  const tempKey = unit === 'celsius' ? 'temp_c' : 'temp_f';
  const tempUnitLabel = unit === 'celsius' ? '°C' : '°F';
  const precipKey = unit === 'celsius' ? 'precip_mm' : 'precip_in';
  const precipUnitLabel = unit === 'celsius' ? 'mm' : 'in';
  const windKey = unit === 'celsius' ? 'wind_kph' : 'wind_mph';
  const windUnitLabel = unit === 'celsius' ? 'kph' : 'mph';

  return (
    <div style={{ padding: 24, minHeight: '100vh', background: 'linear-gradient(180deg, #b3e0ff 0%, #ffffff 100%)' }}>
      <h2>Details for {cityName}</h2>
      <Forecast city={cityName} unit={unit} />
      <WeatherChart data={hourly} dataKey={tempKey} label={`Hourly Temperature (Forecast, ${tempUnitLabel})`} />
      <WeatherChart data={hourly} dataKey={precipKey} label={`Hourly Precipitation (Forecast, ${precipUnitLabel})`} />
      <WeatherChart data={hourly} dataKey={windKey} label={`Hourly Wind Speed (Forecast, ${windUnitLabel})`} />
      <div>
        <h3>Stats (Forecast)</h3>
        <p>Pressure: {stats.pressure_mb !== undefined ? stats.pressure_mb : 'N/A'} mb</p>
        <p>
          Dew Point: {
            (() => {
              const c = stats.dewpoint_c;
              const f = stats.dewpoint_f;
              if (unit === 'celsius') return c !== undefined ? `${c}°C` : 'N/A';
              if (f !== undefined) return `${f}°F`;
              if (c !== undefined) return `${(c * 9/5 + 32).toFixed(1)}°F`;
              return 'N/A';
            })()
          }
        </p>
        <p>UV Index: {stats.uv !== undefined ? stats.uv : 'N/A'}</p>
        <p>Wind Direction: {stats.wind_dir || 'N/A'} ({stats.wind_degree !== undefined ? stats.wind_degree + '°' : 'N/A'})</p>
      </div>
      <hr />
      <h3>Explore Historical Trends</h3>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} max={endDate} />
      </label>
      <label style={{ marginLeft: 16 }}>
        End Date:
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} max={new Date().toISOString().slice(0, 10)} min={startDate} />
      </label>
      <WeatherChart data={historyData} dataKey={tempKey} label={`Hourly Temperature (${tempUnitLabel}) ${startDate} to ${endDate}`} />
      <WeatherChart data={historyData} dataKey={precipKey} label={`Hourly Precipitation (${precipUnitLabel}) ${startDate} to ${endDate}`} />
      <WeatherChart data={historyData} dataKey={windKey} label={`Hourly Wind Speed (${windUnitLabel}) ${startDate} to ${endDate}`} />
      <div>
        <h3>Stats (History)</h3>
        {historyStats.map((stat, idx) => stat ? (
          <div key={idx}>
            <p>Date: {new Date(startDate).setDate(new Date(startDate).getDate() + idx) && new Date(new Date(startDate).setDate(new Date(startDate).getDate() + idx)).toISOString().slice(0, 10)}</p>
            <p>Pressure: {stat.pressure_mb !== undefined ? stat.pressure_mb : 'N/A'} mb</p>
            <p>
              Dew Point: {
                (() => {
                  const c = stat.dewpoint_c;
                  const f = stat.dewpoint_f;
                  if (unit === 'celsius') return c !== undefined ? `${c}°C` : 'N/A';
                  if (f !== undefined) return `${f}°F`;
                  if (c !== undefined) return `${(c * 9/5 + 32).toFixed(1)}°F`;
                  return 'N/A';
                })()
              }
            </p>
            <p>UV Index: {stat.uv !== undefined ? stat.uv : 'N/A'}</p>
            <p>Wind Direction: {stat.wind_dir || 'N/A'} ({stat.wind_degree !== undefined ? stat.wind_degree + '°' : 'N/A'})</p>
          </div>
        ) : null)}
      </div>
    </div>
  );
}
