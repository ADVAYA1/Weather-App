import React from 'react';

export default function Settings({ unit, onToggle }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label>
        <input type="checkbox" checked={unit === 'fahrenheit'} onChange={onToggle} />
        Switch to {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
      </label>
    </div>
  );
}
