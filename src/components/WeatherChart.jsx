import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';

export default function WeatherChart({ data, dataKey, label }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>{label}</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
          <Brush dataKey="time" height={24} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
